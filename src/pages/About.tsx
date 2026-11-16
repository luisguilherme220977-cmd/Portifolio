import React from 'react';
import { motion } from 'framer-motion';

const CINEMATIC_EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Sobre Mim page – replace the placeholder text with your real bio.
 */
const About: React.FC = () => {
  return (
    <motion.main
      className="relative min-h-screen w-full bg-[#000000] text-[#F5F5F5] overflow-hidden flex flex-col justify-center items-center p-8 selection:bg-[#E5A978]/30 selection:text-white"
      initial={{ opacity: 0, filter: 'brightness(0.3)' }}
      animate={{ opacity: 1, filter: 'brightness(1)' }}
      exit={{ opacity: 0, filter: 'brightness(0.3)' }}
      transition={{ duration: 0.6, ease: CINEMATIC_EASE as any }}
    >
      <h1 className="text-4xl font-bold mb-6">Sobre Mim</h1>
      <div className="max-w-3xl text-center space-y-4">
        <p>
          Olá! Eu sou Luis Guilherme, 15 anos, estudante apaixonado por desenvolvimento front‑end e experiências interativas.
        </p>
        <p>
          Tenho experiência construindo projetos com React, Vite, Tailwind CSS, Motion e GSAP. Gosto de criar interfaces cinematográficas, animações fluidas e experiências imersivas.
        </p>
        <p>
          Meu objetivo é transformar ideias criativas em produtos digitais que encantem e impactem usuários.
        </p>
      </div>
    </motion.main>
  );
};

export default About;
