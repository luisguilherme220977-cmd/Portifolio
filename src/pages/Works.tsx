import React from 'react';
import { motion } from 'framer-motion';

const CINEMATIC_EASE = [0.16, 1, 0.3, 1] as const;

// Placeholder project data – replace with your real projects later
const projects = [
  {
    title: 'Projeto 1',
    description: 'Descrição curta do projeto 1.',
    tech: ['React', 'Tailwind', 'Motion'],
    image: '/assets/project1.png', // you can add an image in public/assets
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    title: 'Projeto 2',
    description: 'Descrição curta do projeto 2.',
    tech: ['Vite', 'GSAP'],
    image: '/assets/project2.png',
    liveUrl: '#',
    repoUrl: '#',
  },
];

const Works: React.FC = () => {
  return (
    <motion.main
      className="relative min-h-screen w-full bg-[#000000] text-[#F5F5F5] overflow-hidden flex flex-col items-center p-8 selection:bg-[#E5A978]/30 selection:text-white"
      initial={{ opacity: 0, filter: 'brightness(0.3)' }}
      animate={{ opacity: 1, filter: 'brightness(1)' }}
      exit={{ opacity: 0, filter: 'brightness(0.3)' }}
      transition={{ duration: 0.6, ease: CINEMATIC_EASE as any }}
    >
      <h1 className="text-4xl font-bold mb-8">Meus Trabalhos</h1>
      <div className="grid gap-8 w-full max-w-5xl md:grid-cols-2">
        {projects.map((proj, idx) => (
          <motion.div
            key={idx}
            className="bg-[#111111] rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
            whileHover={{ scale: 1.02 }}
          >
            {/* Image */}
            <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${proj.image})` }} />
            <div className="p-4">
              <h2 className="text-2xl font-semibold mb-2">{proj.title}</h2>
              <p className="mb-2 text-sm">{proj.description}</p>
              <p className="text-xs text-[#E5A978] mb-4">{proj.tech.join(' | ')}</p>
              <div className="flex gap-4">
                <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" className="px-3 py-1 border border-[#E5A978] rounded hover:bg-[#E5A978]/10 transition">
                  Demo
                </a>
                <a href={proj.repoUrl} target="_blank" rel="noopener noreferrer" className="px-3 py-1 border border-[#E5A978] rounded hover:bg-[#E5A978]/10 transition">
                  Código
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.main>
  );
};

export default Works;
