/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useImperativeHandle, useRef, useState, forwardRef } from 'react';

export type PortraitFocus = 'loop' | 'first' | 'second';

export interface LivingPortraitHandle {
  exportVideo: (onProgress?: (pct: number) => void) => Promise<void>;
}

interface LivingPortraitBackgroundProps {
  focusMode: PortraitFocus;
  isPaused: boolean;
  onPhaseChange?: (phase: number) => void;
}

/** Path to the hero background video in public/assets/ (with cache buster) */
const VIDEO_SRC = '/assets/hero-background.mp4?v=' + Date.now();

/** Duration of the crossfade transition in seconds (suavização leve e rápida) */
const CROSSFADE_DURATION = 0.65;
/** Safety margin (seconds) before video ends to complete crossfade */
const END_MARGIN = 0.15;

export const LivingPortraitBackground = forwardRef<LivingPortraitHandle, LivingPortraitBackgroundProps>(
  function LivingPortraitBackground({ isPaused }, ref) {
    const video0Ref = useRef<HTMLVideoElement | null>(null);
    const video1Ref = useRef<HTMLVideoElement | null>(null);
    const [isReady, setIsReady] = useState<boolean>(false);
    const [loadError, setLoadError] = useState<boolean>(false);

    // activeIndex: 0 means video0 is the base playing video, 1 means video1 is base
    const activeIndexRef = useRef<0 | 1>(0);
    const isTransitioningRef = useRef<boolean>(false);
    const isPausedRef = useRef<boolean>(isPaused);
    isPausedRef.current = isPaused;

    useEffect(() => {
      const v0 = video0Ref.current;
      const v1 = video1Ref.current;
      if (!v0 || !v1) return;

      // Initial styles
      v0.style.opacity = '1';
      v0.style.zIndex = '1';
      v1.style.opacity = '0';
      v1.style.zIndex = '2';

      let rafId = 0;
      let isMounted = true;

      const getVideos = () => {
        const active = activeIndexRef.current === 0 ? v0 : v1;
        const standby = activeIndexRef.current === 0 ? v1 : v0;
        return { active, standby };
      };

      const startCrossfade = () => {
        if (isTransitioningRef.current || !isMounted) return;
        isTransitioningRef.current = true;

        const { active, standby } = getVideos();

        // Prepare standby video on top
        standby.style.zIndex = '2';
        active.style.zIndex = '1';
        // Active video stays fully opaque so there is ZERO black bleed-through
        active.style.opacity = '1';

        standby.currentTime = 0;
        standby.play().catch(() => {});

        const startTime = performance.now();
        const durationMs = CROSSFADE_DURATION * 1000;

        const tick = (now: number) => {
          if (!isMounted) return;

          const elapsed = now - startTime;
          const progress = Math.min(1, Math.max(0, elapsed / durationMs));

          // Smooth cosine ease-in-out curve
          const eased = 0.5 - 0.5 * Math.cos(progress * Math.PI);

          // Only fade the incoming video in over the fully-opaque outgoing video
          standby.style.opacity = eased.toString();

          if (progress < 1) {
            rafId = requestAnimationFrame(tick);
          } else {
            // Transition complete: standby is now 100% visible
            standby.style.opacity = '1';
            standby.style.zIndex = '1';

            // Reset old active
            active.pause();
            active.currentTime = 0;
            active.style.opacity = '0';
            active.style.zIndex = '0';

            // Swap active index
            activeIndexRef.current = activeIndexRef.current === 0 ? 1 : 0;
            isTransitioningRef.current = false;
          }
        };

        rafId = requestAnimationFrame(tick);
      };

      // Check playback position on every frame for perfect millisecond accuracy
      const monitorLoop = () => {
        if (!isMounted) return;

        const { active } = getVideos();
        if (active && active.duration && !active.paused && !isTransitioningRef.current) {
          const triggerTime = active.duration - CROSSFADE_DURATION - END_MARGIN;
          if (active.currentTime >= triggerTime && triggerTime > 0) {
            startCrossfade();
          }
        }

        rafId = requestAnimationFrame(monitorLoop);
      };

      rafId = requestAnimationFrame(monitorLoop);

      return () => {
        isMounted = false;
        cancelAnimationFrame(rafId);
      };
    }, []);

    // Sync play/pause with external control
    useEffect(() => {
      const v0 = video0Ref.current;
      const v1 = video1Ref.current;
      const currentActive = activeIndexRef.current === 0 ? v0 : v1;
      const currentStandby = activeIndexRef.current === 0 ? v1 : v0;

      if (!currentActive) return;

      if (isPaused) {
        currentActive.pause();
        if (isTransitioningRef.current && currentStandby) {
          currentStandby.pause();
        }
      } else {
        currentActive.play().catch(() => {});
        if (isTransitioningRef.current && currentStandby) {
          currentStandby.play().catch(() => {});
        }
      }
    }, [isPaused]);

    // Handle export video
    useImperativeHandle(ref, () => ({
      exportVideo: async (onProgress?: (pct: number) => void) => {
        const v = activeIndexRef.current === 0 ? video0Ref.current : video1Ref.current;
        if (!v) throw new Error('Video element is not available.');

        const offscreen = document.createElement('canvas');
        offscreen.width = 1920;
        offscreen.height = 1080;
        const ctx = offscreen.getContext('2d');
        if (!ctx) throw new Error('Canvas 2D context is required.');

        const mimeCandidates = ['video/webm;codecs=vp9', 'video/webm;codecs=vp8', 'video/webm'];
        const mimeType = mimeCandidates.find((m) => MediaRecorder.isTypeSupported(m)) || 'video/webm';

        const stream = offscreen.captureStream(30);
        const recorder = new MediaRecorder(stream, { mimeType, videoBitsPerSecond: 10_000_000 });
        const chunks: BlobPart[] = [];
        recorder.ondataavailable = (e) => {
          if (e.data.size > 0) chunks.push(e.data);
        };

        const recordedBlob = new Promise<Blob>((resolve, reject) => {
          recorder.onstop = () => resolve(new Blob(chunks, { type: mimeType }));
          recorder.onerror = () => reject(new Error('Recording failed.'));
        });

        v.currentTime = 0;
        await v.play().catch(() => {});
        recorder.start();
        const duration = v.duration || 7.85;

        await new Promise<void>((resolve) => {
          const drawFrame = () => {
            if (v.ended || v.currentTime >= duration) {
              resolve();
              return;
            }
            ctx.drawImage(v, 0, 0, 1920, 1080);
            if (onProgress) {
              onProgress(Math.min(100, Math.round((v.currentTime / duration) * 100)));
            }
            requestAnimationFrame(drawFrame);
          };
          requestAnimationFrame(drawFrame);
        });

        recorder.stop();
        const blob = await recordedBlob;
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'layer-x-neural-loop-1080p.webm';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(url), 5000);
      },
    }));

    return (
      <div className="absolute inset-0 bg-[#000000] overflow-hidden pointer-events-none select-none z-0">
        {/* Container posicionado mais para a direita para desobstruir o texto do lado esquerdo */}
        <div className="relative w-full h-full translate-x-[10%] sm:translate-x-[15%] lg:translate-x-[18%] scale-105 lg:scale-110 [mask-image:linear-gradient(to_right,transparent_0%,black_12%,black_100%)]">
          {/* Layer 0 */}
          <video
            ref={video0Ref}
            src={VIDEO_SRC}
            autoPlay
            muted
            playsInline
            preload="auto"
            onCanPlayThrough={() => setIsReady(true)}
            onError={() => setLoadError(true)}
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover object-center"
            style={{ willChange: 'opacity' }}
          />

          {/* Layer 1 */}
          <video
            ref={video1Ref}
            src={VIDEO_SRC}
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover object-center"
            style={{ willChange: 'opacity' }}
          />
        </div>

        {/* Fallback */}
        {loadError && (
          <div className="absolute inset-0 bg-black flex justify-end overflow-hidden">
            <img
              src="/assets/aistudio/image_405b7c6c.png"
              alt=""
              referrerPolicy="no-referrer"
              className="h-full w-auto max-w-none object-cover translate-x-[20%]"
            />
          </div>
        )}
      </div>
    );
  }
);
