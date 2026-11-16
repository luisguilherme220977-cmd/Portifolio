import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';

// ParallaxBackground component – interactive mouse‑driven layers with radial lighting
export const ParallaxBackground: React.FC = () => {
  const layerRefs = useRef<HTMLDivElement[]>([]);
  const lightRef = useRef<HTMLDivElement>(null);

  // Helper to set transform on a layer based on depth factor
  const setLayerTransform = (el: HTMLDivElement, x: number, y: number, depth: number) => {
    const translateX = x * depth;
    const translateY = y * depth;
    el.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`;
  };

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;
    if (prefersReduced || isMobile) return; // disable on reduced‑motion or mobile

    let rafId = 0;
    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const normX = (e.clientX / window.innerWidth - 0.5) * 30; // max translate ~15px each side
        const normY = (e.clientY / window.innerHeight - 0.5) * 30;
        // Update each layer with its depth factor
        layerRefs.current.forEach((layer, i) => {
          const depth = 0.2 + i * 0.15; // increasing depth per layer
          setLayerTransform(layer, normX, normY, depth);
        });
        // Position radial light
        if (lightRef.current) {
          lightRef.current.style.left = `${e.clientX}px`;
          lightRef.current.style.top = `${e.clientY}px`;
        }
      });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Render three decorative layers + radial light
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      {/* Layer 1 – subtle dark particles */}
      <div
        ref={el => el && (layerRefs.current[0] = el)}
        className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.03),transparent_70%)]"
      />
      {/* Layer 2 – amber specks */}
      <div
        ref={el => el && (layerRefs.current[1] = el)}
        className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgba(229,169,120,0.04),transparent_70%)]"
      />
      {/* Layer 3 – deeper amber glows */}
      <div
        ref={el => el && (layerRefs.current[2] = el)}
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(229,169,120,0.06),transparent_80%)]"
      />
      {/* Radial light following cursor */}
      <motion.div
        ref={lightRef}
        className="absolute w-64 h-64 rounded-full bg-[radial-gradient(circle,rgba(229,169,120,0.12),transparent_70%)] mix-blend-screen pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ duration: 0.5 }}
      />
    </div>
  );
};
