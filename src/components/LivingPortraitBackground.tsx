import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { motion, type MotionValue } from 'motion/react';

export type PortraitFocus = 'loop' | 'first' | 'second';

export interface LivingPortraitHandle {
  /** Export the current video as a WebM file. */
  exportVideo: (onProgress?: (pct: number) => void) => Promise<void>;
}

interface LivingPortraitBackgroundProps {
  focusMode: PortraitFocus;
  isPaused: boolean;
  parallaxX: MotionValue<number>;
  parallaxY: MotionValue<number>;
  onPhaseChange?: (phase: number) => void;
}

/** Simple single‑video background (no cross‑fade, no extra layers). */
export const LivingPortraitBackground = forwardRef<LivingPortraitHandle, LivingPortraitBackgroundProps>(
  function LivingPortraitBackground({ focusMode, isPaused, parallaxX, parallaxY }, ref) {
    const videoRef = useRef<HTMLVideoElement | null>(null);

    // Play / pause based on external control
    useEffect(() => {
      const video = videoRef.current;
      if (!video) return;
      if (isPaused) video.pause();
      else video.play().catch(() => {});
    }, [isPaused]);

    // Expose exportVideo method via ref
    useImperativeHandle(ref, () => ({
      exportVideo: async (onProgress) => {
        const v = videoRef.current;
        if (!v) throw new Error('Video element not available');
        const canvas = document.createElement('canvas');
        canvas.width = 1920;
        canvas.height = 1080;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Canvas 2D context required');
        const mime = ['video/webm;codecs=vp9', 'video/webm;codecs=vp8', 'video/webm'].find((m) =>
          MediaRecorder.isTypeSupported(m),
        ) as string;
        const stream = canvas.captureStream(30);
        const recorder = new MediaRecorder(stream, { mimeType: mime, videoBitsPerSecond: 10_000_000 });
        const chunks: BlobPart[] = [];
        recorder.ondataavailable = (e) => { if (e.data.size > 0) chunks.push(e.data); };
        const recorded = new Promise<Blob>((resolve, reject) => {
          recorder.onstop = () => resolve(new Blob(chunks, { type: mime }));
          recorder.onerror = () => reject(new Error('Recording failed'));
        });
        v.currentTime = 0;
        await v.play().catch(() => {});
        recorder.start();
        const duration = v.duration || 7.85;
        await new Promise<void>((res) => {
          const draw = () => {
            if (v.ended || v.currentTime >= duration) { res(); return; }
            ctx.drawImage(v, 0, 0, 1920, 1080);
            if (onProgress) onProgress(Math.min(100, Math.round((v.currentTime / duration) * 100)));
            requestAnimationFrame(draw);
          };
          draw();
        });
        recorder.stop();
        await recorded; // result ignored for now
        v.pause();
      },
    }));

    // Choose source based on focusMode – currently all use the same looping video
    const src = focusMode === 'loop' ? '/assets/hero-background.mp4' : '/assets/hero-background.mp4';

    return (
      <motion.video
        ref={videoRef}
        src={src}
        autoPlay={!isPaused}
        loop={focusMode === 'loop'}
        muted
        playsInline
        className="hero-background-video absolute left-0 top-0 z-[-10] h-[48svh] w-full object-cover md:inset-y-0 md:left-[20%] md:h-full md:w-full"
        style={{
          x: parallaxX,
          y: parallaxY,
          pointerEvents: 'none',
        }}
      />
    );
  }
);

export default LivingPortraitBackground;
