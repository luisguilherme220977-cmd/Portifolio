import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import Works from './Works';

type Panel = 'about' | 'projects' | 'ending';

const FADE_EASE = [0.4, 0, 0.2, 1] as const;
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

const biography = [
  'Olá! Meu nome é Luis Guilherme, tenho 15 anos e sou de Maceió, Alagoas.',
  'Sou um jovem desenvolvedor apaixonado por tecnologia, criatividade e inovação. Atualmente, trabalho com o desenvolvimento de landing pages, criação de soluções digitais e gerenciamento de redes sociais, buscando transformar ideias em projetos que gerem valor.',
  'Minha trajetória é movida por um propósito: construir um futuro melhor, conquistar minha independência financeira e, principalmente, ajudar minha família e proporcionar orgulho aos meus pais.',
  'Acredito que o crescimento acontece por meio do aprendizado constante, da dedicação e da vontade de evoluir. Por isso, busco aprimorar minhas habilidades diariamente, explorar novas tecnologias e transformar cada oportunidade em experiência.',
  'Estou apenas começando, mas tenho grandes objetivos. Meu compromisso é continuar aprendendo, criando e evoluindo, um projeto de cada vez.',
];

const About: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();
  const firstPanel: Panel = location.hash === '#projetos'
    ? 'projects'
    : location.hash === '#encerramento'
      ? 'ending'
      : 'about';
  const [targetPanel, setTargetPanel] = useState<Panel>(firstPanel);
  const [accessiblePanel, setAccessiblePanel] = useState<Panel>(firstPanel);
  const [endingNeedsPlay, setEndingNeedsPlay] = useState(firstPanel === 'ending');
  const targetPanelRef = useRef<Panel>(firstPanel);
  const pendingFocusRef = useRef(false);
  const aboutHeadingRef = useRef<HTMLHeadingElement>(null);
  const projectsHeadingRef = useRef<HTMLHeadingElement>(null);
  const endingHeadingRef = useRef<HTMLHeadingElement>(null);
  const endingVideoRef = useRef<HTMLVideoElement>(null);
  targetPanelRef.current = targetPanel;
  const fadeTransition = prefersReducedMotion
    ? { duration: 0.01 }
    : { type: 'tween' as const, duration: 0.8, ease: FADE_EASE };
  const textSequence = prefersReducedMotion ? reducedContentSequence : contentSequence;
  const textRevealVariants = prefersReducedMotion ? reducedTextReveal : textReveal;

  useEffect(() => {
    setTargetPanel(
      location.hash === '#projetos'
        ? 'projects'
        : location.hash === '#encerramento'
          ? 'ending'
          : 'about',
    );
  }, [location.hash]);

  const goToPanel = (panel: Panel) => {
    pendingFocusRef.current = true;
    setTargetPanel(panel);
    navigate(
      panel === 'projects'
        ? '/about#projetos'
        : panel === 'ending'
          ? '/about#encerramento'
          : '/about',
      { replace: true },
    );

    if (panel === 'ending') {
      const video = endingVideoRef.current;
      if (!video) {
        setEndingNeedsPlay(true);
        return;
      }

      video.currentTime = 0;
      setEndingNeedsPlay(false);
      void video.play().catch(() => setEndingNeedsPlay(true));
    }
  };

  const playEnding = () => {
    const video = endingVideoRef.current;
    if (!video) return;

    setEndingNeedsPlay(false);
    void video.play().catch(() => setEndingNeedsPlay(true));
  };

  const returnToStart = () => {
    endingVideoRef.current?.pause();
    navigate('/#inicio');
  };

  const completeFade = (panel: Panel) => {
    if (targetPanelRef.current !== panel) return;

    setAccessiblePanel(panel);
    if (!pendingFocusRef.current) return;

    pendingFocusRef.current = false;
    window.requestAnimationFrame(() => {
      const heading = panel === 'about'
        ? aboutHeadingRef.current
        : panel === 'projects'
          ? projectsHeadingRef.current
          : endingHeadingRef.current;
      heading?.focus({ preventScroll: true });
    });
  };

  return (
    <main className="relative isolate min-h-[100svh] w-full overflow-x-clip bg-[#070604] text-[#F5F1EC] selection:bg-[#E5A978]/35 selection:text-white">
      <div
        role="group"
        aria-label="Sobre Mim e Projetos"
        className="relative grid min-h-[100svh] w-full overflow-x-clip"
      >
        <AnimatePresence initial={false} mode="sync">
          {targetPanel === 'about' ? (
            <motion.section
              key="about"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={fadeTransition}
              onAnimationComplete={() => completeFade('about')}
              id="sobre-mim"
              aria-labelledby="about-title"
              aria-hidden={accessiblePanel !== 'about'}
              inert={accessiblePanel !== 'about'}
              className="relative col-start-1 row-start-1 flex min-h-[100svh] min-w-0 items-center overflow-hidden bg-[#070604]"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_76%_48%,rgba(130,34,12,0.22),transparent_48%)]"
              />
              <picture className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
                <source media="(min-width: 768px)" srcSet="/assets/projects-portrait-final.png" />
                <img
                  src="/assets/about-portrait-half.png"
                  alt="Retrato de Luis com headset e iluminação laranja"
                  draggable={false}
                  fetchPriority="high"
                  className="absolute bottom-0 right-[-70vw] h-auto w-[150vw] max-w-none object-contain object-right-bottom opacity-50 md:right-[-38svh] md:h-[100svh] md:w-auto md:opacity-100"
                />
              </picture>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(90deg,#070604_0%,rgba(7,6,4,0.98)_25%,rgba(7,6,4,0.82)_44%,rgba(7,6,4,0.25)_72%,rgba(7,6,4,0.04)_100%)]"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(0deg,rgba(7,6,4,0.52)_0%,transparent_34%,transparent_78%,rgba(7,6,4,0.2)_100%)]"
              />

              <motion.div
                initial="hidden"
                animate="visible"
                variants={textSequence}
                className="relative z-10 mx-auto w-full max-w-[1440px] px-6 py-28 sm:px-12 lg:px-20"
              >
                <div className="max-w-[560px]">
                  <motion.p variants={textRevealVariants} className="mb-4 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-[#E5A978] sm:text-xs">
                    <span aria-hidden="true" className="h-px w-8 bg-[#E5A978]/80" />
                    Quem sou · Maceió, AL
                  </motion.p>
                  <motion.h1
                    id="about-title"
                    ref={aboutHeadingRef}
                    tabIndex={-1}
                    variants={textRevealVariants}
                    className="font-display text-[clamp(2.25rem,4.4vw,4.2rem)] leading-[1.12] tracking-[-0.04em] text-white focus-visible:outline-none"
                  >
                    Sobre <span className="text-[#E5A978]">Mim</span>
                  </motion.h1>
                  <motion.div
                    variants={textSequence}
                    className="mt-6 max-w-[540px] space-y-3.5 text-[13px] leading-[1.65] text-[#D1C9C1] sm:mt-7 sm:space-y-4 sm:text-[14px] sm:leading-[1.7]"
                  >
                    {biography.map((paragraph) => (
                      <motion.p key={paragraph} variants={textRevealVariants}>{paragraph}</motion.p>
                    ))}
                  </motion.div>

                  <motion.button
                    type="button"
                    onClick={() => goToPanel('projects')}
                    variants={textRevealVariants}
                    whileHover={prefersReducedMotion ? undefined : { x: 4, borderColor: 'rgba(229,169,120,0.85)' }}
                    whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                    className="mt-7 inline-flex min-h-12 items-center gap-3 rounded-full border border-[#E5A978]/50 bg-[#100C08]/75 px-5 py-3 text-left text-xs font-medium tracking-[0.015em] text-white shadow-[0_8px_36px_rgba(0,0,0,0.25)] backdrop-blur-sm transition-colors hover:bg-[#E5A978]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#E5A978] sm:text-[13px]"
                  >
                    <span>Já conheci minha história — ver projetos</span>
                    <ArrowRight size={15} className="shrink-0 text-[#E5A978]" aria-hidden="true" />
                  </motion.button>
                </div>
              </motion.div>
            </motion.section>
          ) : targetPanel === 'projects' ? (
            <motion.div
              key="projects"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={fadeTransition}
              onAnimationComplete={() => completeFade('projects')}
              className="relative col-start-1 row-start-1 min-h-[100svh] min-w-0 w-full"
            >
              <Works
                onBack={() => goToPanel('about')}
                onFinish={() => goToPanel('ending')}
                isAccessible={accessiblePanel === 'projects'}
                headingRef={projectsHeadingRef}
              />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <motion.section
        id="encerramento"
        initial={false}
        animate={{ opacity: targetPanel === 'ending' ? 1 : 0 }}
        transition={fadeTransition}
        onAnimationComplete={() => completeFade('ending')}
        onKeyDown={(event) => {
          if (event.key === 'Escape' && targetPanel === 'ending') returnToStart();
        }}
        aria-labelledby="ending-title"
        aria-hidden={accessiblePanel !== 'ending'}
        inert={accessiblePanel !== 'ending'}
        style={{
          visibility: targetPanel === 'ending' ? 'visible' : 'hidden',
          pointerEvents: targetPanel === 'ending' ? 'auto' : 'none',
        }}
        className="fixed inset-0 z-[120] flex items-center justify-center overflow-hidden bg-black"
      >
        <h1
          id="ending-title"
          ref={endingHeadingRef}
          tabIndex={-1}
          className="sr-only"
        >
          Vinheta final de Luis Guilherme
        </h1>
        <video
          ref={endingVideoRef}
          src="/assets/portfolio-outro.mp4"
          preload="metadata"
          playsInline
          onEnded={returnToStart}
          onError={() => setEndingNeedsPlay(true)}
          aria-label="Vinheta final de Luis Guilherme"
          className="h-full w-full object-contain"
        />

        {endingNeedsPlay && targetPanel === 'ending' && (
          <div className="absolute inset-0 z-[5] flex items-center justify-center bg-black/75 px-6 backdrop-blur-sm">
            <div className="max-w-md text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#E5A978]">
                Encerramento
              </p>
              <p className="mt-3 text-sm leading-6 text-white/70">
                A vinheta está pronta para ser reproduzida.
              </p>
              <button
                type="button"
                onClick={playEnding}
                className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-[#E5A978] px-5 py-3 text-xs font-bold uppercase tracking-[0.06em] text-[#170F09] transition-colors hover:bg-[#F2BD8D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#E5A978]"
              >
                Reproduzir vinheta
              </button>
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={returnToStart}
          className="absolute right-5 top-5 z-10 inline-flex min-h-11 items-center rounded-full border border-white/25 bg-black/55 px-4 py-2 text-xs text-white transition hover:border-[#E5A978] hover:text-[#E5A978] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E5A978]"
        >
          Voltar ao início
        </button>
      </motion.section>
    </main>
  );
};

export default About;
