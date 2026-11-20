import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';

export interface PortfolioProject {
  title: string;
  description: string;
  technologies: string[];
  image: string;
  imageAlt: string;
  url: string;
}

// Keep this list limited to published projects with verified details and working links.
const projects: PortfolioProject[] = [];

const TEXT_EASE = [0.22, 1, 0.36, 1] as const;
const contentSequence = {
  hidden: {},
  visible: { transition: { delayChildren: 0.1, staggerChildren: 0.07 } },
};
const reducedContentSequence = {
  hidden: {},
  visible: { transition: { staggerChildren: 0 } },
};
const textReveal = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: TEXT_EASE } },
};
const reducedTextReveal = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.01 } },
};

interface WorksProps {
  onBack: () => void;
  onFinish: () => void;
  isAccessible: boolean;
  headingRef: React.RefObject<HTMLHeadingElement | null>;
}

const Works: React.FC<WorksProps> = ({ onBack, onFinish, isAccessible, headingRef }) => {
  const prefersReducedMotion = useReducedMotion();
  const textSequence = prefersReducedMotion ? reducedContentSequence : contentSequence;
  const textRevealVariants = prefersReducedMotion ? reducedTextReveal : textReveal;

  return (
    <section
      id="projetos"
      aria-labelledby="projects-title"
      aria-hidden={!isAccessible}
      inert={!isAccessible}
      className="relative flex min-h-[100svh] min-w-0 w-full items-center overflow-hidden bg-[#090705]"
    >
    <img
      src="/assets/projects-portrait-shoulder.png"
      alt=""
      aria-hidden="true"
      draggable={false}
      fetchPriority="high"
      className="pointer-events-none absolute bottom-0 z-0 hidden h-[100svh] w-auto max-w-none object-contain object-left-bottom lg:-left-[45svh] lg:block xl:-left-[67svh]"
    />
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(90deg,rgba(9,7,5,0.02)_0%,rgba(9,7,5,0.04)_42%,rgba(9,7,5,0.18)_48%,#090705_58%,#090705_100%)] xl:bg-[linear-gradient(90deg,rgba(9,7,5,0.04)_0%,rgba(9,7,5,0.08)_42%,rgba(9,7,5,0.38)_56%,#090705_66%,#090705_100%)]"
    />
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_82%_36%,rgba(132,35,14,0.16),transparent_40%)]"
    />
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-[0.13] [background-image:linear-gradient(rgba(229,169,120,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(229,169,120,0.12)_1px,transparent_1px)] [background-size:84px_84px] [mask-image:linear-gradient(90deg,transparent,black_56%,transparent)]"
    />

    <motion.div
      initial="hidden"
      animate="visible"
      variants={textSequence}
      className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1440px] flex-col justify-center px-6 pb-10 pt-28 sm:px-12 lg:px-20 lg:pl-[max(54svh,46vw)] lg:pr-8 xl:pl-[calc(95svh_-_max(0px,_50vw_-_720px))] xl:pr-[3vw]"
    >
      <motion.div variants={textRevealVariants} className="flex items-center justify-between gap-5">
        <p className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.27em] text-[#E5A978] sm:text-xs">
          <span aria-hidden="true" className="h-px w-8 bg-[#E5A978]/80" />
          Arquivo criativo
        </p>
        <p className="shrink-0 font-mono text-[10px] tracking-[0.12em] text-white/35 sm:text-xs" aria-label="Seção 2 de 2">
          02 <span className="px-1 text-[#E5A978]/60">/</span> 02
        </p>
      </motion.div>

      <motion.header variants={textRevealVariants} className="mt-6">
        <h2
          id="projects-title"
          ref={headingRef}
          tabIndex={-1}
          className="font-display text-[clamp(2rem,5.2vw,5rem)] leading-[1.13] tracking-[-0.045em] text-white focus-visible:outline-none xl:text-[clamp(2rem,2.7vw,2.75rem)]"
        >
          Projetos <span className="text-[#E5A978]">selecionados.</span>
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-6 text-white/55 sm:text-base">
          Ideias transformadas em experiências digitais.
        </p>
      </motion.header>

      {projects.length > 0 ? (
        <motion.div variants={textSequence} className="mt-9 space-y-8 sm:mt-12 sm:space-y-12">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              variants={textRevealVariants}
              whileHover={prefersReducedMotion ? undefined : { y: -3 }}
              transition={{ duration: 0.25 }}
              className="group grid overflow-hidden border-y border-white/[0.12] bg-white/[0.015] md:grid-cols-[1.15fr_0.85fr]"
            >
              <div className="relative min-h-52 overflow-hidden bg-[#110D0A] sm:min-h-64 md:min-h-[330px]">
                <img
                  src={project.image}
                  alt={project.imageAlt}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                />
                <span className="absolute left-4 top-4 font-mono text-[10px] tracking-[0.16em] text-white/75 sm:left-6 sm:top-6">
                  {String(index + 1).padStart(2, '0')} <span className="text-[#E5A978]">/</span> PROJETO
                </span>
              </div>

              <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">{project.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/60">{project.description}</p>
                <ul aria-label="Tecnologias utilizadas" className="mt-5 flex flex-wrap gap-2">
                  {project.technologies.map((technology) => (
                    <li key={technology} className="border border-[#E5A978]/25 px-2.5 py-1 font-mono text-[10px] text-[#E5A978]">
                      {technology}
                    </li>
                  ))}
                </ul>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex min-h-11 w-fit items-center gap-2 border-b border-[#E5A978]/55 pb-1 text-xs font-semibold text-white transition-colors hover:border-[#E5A978] hover:text-[#E5A978] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E5A978]"
                >
                  Visualizar projeto <ExternalLink size={14} aria-hidden="true" />
                </a>
              </div>
            </motion.article>
          ))}
        </motion.div>
      ) : (
        <motion.div variants={textRevealVariants} className="relative mt-9 flex min-h-[min(38vh,360px)] w-full items-center overflow-hidden border-x border-white/[0.12] bg-[#100B08]/65 py-8 px-6 shadow-[0_20px_60px_rgba(0,0,0,0.22)] sm:mt-12 sm:min-h-[min(42vh,410px)] sm:px-8 lg:-ml-16 lg:w-[calc(100%_+_4rem)]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-28 h-[22rem] w-[22rem] rounded-full bg-[#D34B29]/[0.08] blur-[90px] sm:right-[4%] sm:h-[28rem] sm:w-[28rem]"
          />
          <span aria-hidden="true" className="pointer-events-none absolute right-[4%] top-1/2 hidden -translate-y-1/2 select-none font-display text-[clamp(10rem,23vw,22rem)] leading-none tracking-[-0.12em] text-white/[0.035] sm:block">
            01
          </span>
          <div className="relative z-10 max-w-[640px] lg:left-16">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#E5A978]/80 sm:text-[11px]">
              Portfólio em construção
            </p>
            <h3 className="mt-4 text-[clamp(1.45rem,2.7vw,2.25rem)] font-medium leading-[1.25] tracking-[-0.025em] text-white">
              Ainda não tenho projetos publicados.
            </h3>
            <p className="mt-3 max-w-md text-sm leading-6 text-white/50">
              Em breve, vou compartilhar por aqui meus projetos e parcerias.
            </p>
          </div>
        </motion.div>
      )}

      <motion.div variants={textRevealVariants} className="mt-7 flex flex-wrap items-center justify-between gap-3 sm:mt-8 sm:gap-5">
        <motion.button
          type="button"
          onClick={onBack}
          whileHover={prefersReducedMotion ? undefined : { x: -4, borderColor: 'rgba(229,169,120,0.85)' }}
          whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
          className="inline-flex min-h-11 items-center gap-2.5 rounded-full border border-white/15 bg-black/25 px-4 py-2.5 text-xs text-white/75 transition-colors hover:bg-white/[0.04] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#E5A978]"
        >
          <ArrowLeft size={14} className="text-[#E5A978]" aria-hidden="true" />
          Voltar para Sobre Mim
        </motion.button>

        <motion.button
          type="button"
          onClick={onFinish}
          whileHover={prefersReducedMotion ? undefined : { x: 4, borderColor: 'rgba(229,169,120,0.85)' }}
          whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
          className="inline-flex min-h-11 items-center gap-2.5 rounded-full border border-[#E5A978]/45 bg-[#100C08]/65 px-4 py-2.5 text-xs font-medium text-[#E5A978] transition-colors hover:bg-[#E5A978]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#E5A978]"
        >
          <span className="sm:hidden">Encerrar</span>
          <span className="hidden sm:inline">Assistir à vinheta final</span>
          <ArrowRight size={14} aria-hidden="true" />
        </motion.button>
      </motion.div>
    </motion.div>
    </section>
  );
};

export default Works;
