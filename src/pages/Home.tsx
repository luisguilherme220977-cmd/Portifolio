import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import {
  Maximize2,
  Minimize2,
  Share2,
} from 'lucide-react';
import { LivingPortraitBackground } from '../components/LivingPortraitBackground';

const CINEMATIC_EASE = [0.16, 1, 0.3, 1] as const;
const HERO_ROLE_TEXT = 'VIBECODER\nDIGITAL';
const WHATSAPP_URL =
  'https://wa.me/?text=Ol%C3%A1%20Luis%20Guilherme!%20Quero%20conversar%20sobre%20um%20projeto.';

function Home() {
  const [shareNotice, setShareNotice] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showreelStatus, setShowreelStatus] = useState<'idle' | 'playing' | 'closing'>('idle');
  const showreelRef = useRef<HTMLVideoElement | null>(null);
  const skipButtonRef = useRef<HTMLButtonElement | null>(null);
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();
  const [typedRole, setTypedRole] = useState(prefersReducedMotion ? HERO_ROLE_TEXT : '');
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const backgroundX = useSpring(useTransform(pointerX, [-1, 1], [-18, 18]), {
    stiffness: 75,
    damping: 22,
    mass: 0.7,
  });
  const backgroundY = useSpring(useTransform(pointerY, [-1, 1], [-10, 10]), {
    stiffness: 75,
    damping: 22,
    mass: 0.7,
  });
  const glowX = useSpring(0, { stiffness: 100, damping: 24, mass: 0.7 });
  const glowY = useSpring(0, { stiffness: 100, damping: 24, mass: 0.7 });
  const glowOpacity = useSpring(0, { stiffness: 100, damping: 24, mass: 0.7 });

  useEffect(() => {
    if (showreelStatus === 'playing') skipButtonRef.current?.focus();
  }, [showreelStatus]);

  useEffect(() => {
    if (prefersReducedMotion) {
      setTypedRole(HERO_ROLE_TEXT);
      return;
    }

    setTypedRole('');
    let characterIndex = 0;
    let typingInterval: number | undefined;
    const typingDelay = window.setTimeout(() => {
      typingInterval = window.setInterval(() => {
        characterIndex += 1;
        setTypedRole(HERO_ROLE_TEXT.slice(0, characterIndex));

        if (characterIndex >= HERO_ROLE_TEXT.length && typingInterval !== undefined) {
          window.clearInterval(typingInterval);
        }
      }, 65);
    }, 350);

    return () => {
      window.clearTimeout(typingDelay);
      if (typingInterval !== undefined) window.clearInterval(typingInterval);
    };
  }, [prefersReducedMotion]);

  const handleHeroPointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (prefersReducedMotion || event.pointerType === 'touch') return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const localX = event.clientX - bounds.left;
    const localY = event.clientY - bounds.top;
    pointerX.set(Math.max(-1, Math.min(1, (localX / bounds.width) * 2 - 1)));
    pointerY.set(Math.max(-1, Math.min(1, (localY / bounds.height) * 2 - 1)));
    glowX.set(localX);
    glowY.set(localY);
    glowOpacity.set(0.85);
  };

  const resetHeroPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
    glowOpacity.set(0);
  };

  const finishShowreel = () => {
    if (showreelStatus !== 'playing') return;
    showreelRef.current?.pause();
    setShowreelStatus('closing');
  };

  const playShowreel = () => {
    if (showreelStatus !== 'idle') return;
    const video = showreelRef.current;
    if (!video) {
      navigate('/about');
      return;
    }

    video.currentTime = 0;
    setShowreelStatus('playing');
    void video.play().catch(() => navigate('/about'));
  };

  const completeShowreelTransition = () => {
    if (showreelStatus === 'closing') navigate('/about');
  };

  const sharePortfolio = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Luis Guilherme | Vibecoder Digital',
          url: window.location.href,
        });
        return;
      }

      await navigator.clipboard.writeText(window.location.href);
      setShareNotice('Link copiado');
      window.setTimeout(() => setShareNotice(''), 2200);
    } catch {
      setShareNotice('Não foi possível compartilhar agora');
      window.setTimeout(() => setShareNotice(''), 2200);
    }
  };

  const toggleFullscreen = async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
        setIsFullscreen(false);
      } else {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      }
    } catch {
      setShareNotice('Tela cheia indisponível neste navegador');
      window.setTimeout(() => setShareNotice(''), 2200);
    }
  };

  return (
    <motion.main
      className="relative min-h-screen w-full overflow-x-clip bg-[#070604] text-[#F5F1EC] selection:bg-[#E5A978]/30 selection:text-white"
      initial={{ opacity: 0, filter: 'brightness(0.3)' }}
      animate={{ opacity: 1, filter: 'brightness(1)' }}
      exit={{ opacity: 0, filter: 'brightness(0.3)' }}
      transition={{ duration: 0.6, ease: CINEMATIC_EASE as any }}
    >
      <section
        id="inicio"
        onPointerMove={handleHeroPointerMove}
        onPointerLeave={resetHeroPointer}
        className="relative isolate min-h-[100svh] overflow-hidden bg-black"
      >
        <LivingPortraitBackground
          focusMode="loop"
          isPaused={false}
          parallaxX={backgroundX}
          parallaxY={backgroundY}
        />

        <div
          aria-hidden="true"
          className="hero-mobile-transition pointer-events-none absolute inset-0 z-[1]"
        />
        <div
          aria-hidden="true"
          className="hero-mobile-vignette pointer-events-none absolute inset-0 z-[1]"
        />
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 z-[2] h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(229,169,120,0.14),transparent_70%)] mix-blend-screen"
          style={{ x: glowX, y: glowY, opacity: glowOpacity }}
        />

        <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1440px] flex-col justify-between px-6 pb-7 pt-[48svh] sm:px-12 sm:pb-9 md:pt-24 lg:px-20">
          <div className="grid flex-1 items-start md:items-center lg:grid-cols-12">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: CINEMATIC_EASE, delay: 0.1 }}
              className="max-w-[590px] lg:col-span-6"
            >
              <p className="mb-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-[#E5A978] sm:text-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-[#E5A978] shadow-[0_0_12px_#E5A978]" />
                Portfólio digital
              </p>

              <h1 className="font-display text-[clamp(2rem,3.6vw,3.75rem)] leading-[1.2] tracking-[0.012em] text-[#E8AA78]">
                <span className="block">LUIS</span>
                <span className="block whitespace-nowrap">GUILHERME <span className="text-white/75">//</span></span>
                <span className="block" aria-hidden="true">
                  {typedRole.split('\n')[0]}
                  {typedRole.length < 'VIBECODER'.length && <span className="hero-typewriter-caret" />}
                </span>
                <span className="block" aria-hidden="true">
                  {typedRole.split('\n')[1] ?? ''}
                  {typedRole.length >= 'VIBECODER'.length && typedRole.length < HERO_ROLE_TEXT.length && (
                    <span className="hero-typewriter-caret" />
                  )}
                </span>
                <span className="sr-only">VIBECODER DIGITAL</span>
              </h1>

              <p className="mt-6 max-w-[470px] text-sm leading-6 text-white/75 sm:text-[15px] sm:leading-6">
                Vibecoder de Maceió, Alagoas, com 15 anos de idade. Construo sites e experiências
                digitais com velocidade, estilo e zero enrolação. Não é só um site: é a presença
                digital da sua empresa em outro nível.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <motion.button
                  type="button"
                  onClick={playShowreel}
                  whileHover={{ y: -2, boxShadow: '0 12px 34px rgba(229,169,120,0.25)' }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex min-h-11 items-center gap-2.5 rounded-full bg-[#E5A978] px-5 py-3 text-xs font-bold uppercase tracking-[0.06em] text-[#170F09] transition-colors hover:bg-[#F2BD8D]"
                >
                  Sobre mim e meu portfólio
                </motion.button>

                <button
                  type="button"
                  aria-label="Compartilhar portfólio"
                  onClick={sharePortfolio}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white/75 transition hover:border-[#E5A978]/60 hover:text-[#E5A978] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E5A978]"
                >
                  <Share2 size={16} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  aria-label={isFullscreen ? 'Sair da tela cheia' : 'Ver em tela cheia'}
                  aria-pressed={isFullscreen}
                  onClick={toggleFullscreen}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white/75 transition hover:border-[#E5A978]/60 hover:text-[#E5A978] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E5A978]"
                >
                  {isFullscreen ? <Minimize2 size={16} aria-hidden="true" /> : <Maximize2 size={16} aria-hidden="true" />}
                </button>
              </div>
              <p className="sr-only" aria-live="polite">{shareNotice}</p>
            </motion.div>
          </div>

        </div>

      </section>

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Showreel de Luis Guilherme"
        aria-hidden={showreelStatus === 'idle'}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
        style={{
          visibility: showreelStatus === 'idle' ? 'hidden' : 'visible',
          pointerEvents: showreelStatus === 'playing' ? 'auto' : 'none',
        }}
        initial={false}
        animate={{ opacity: showreelStatus === 'playing' ? 1 : 0 }}
        transition={{ duration: showreelStatus === 'closing' ? 0.5 : 0.35, ease: CINEMATIC_EASE }}
        onAnimationComplete={completeShowreelTransition}
        onKeyDown={(event) => {
          if (event.key === 'Escape' && showreelStatus === 'playing') finishShowreel();
        }}
      >
        <video
          ref={showreelRef}
          src="/assets/about-showreel.mp4"
          preload="metadata"
          playsInline
          onEnded={finishShowreel}
          onError={() => {
            if (showreelStatus === 'playing') navigate('/about');
          }}
          aria-label="Vídeo de apresentação de Luis Guilherme"
          className="h-full w-full object-contain"
        />
        <button
          ref={skipButtonRef}
          type="button"
          onClick={finishShowreel}
          disabled={showreelStatus !== 'playing'}
          tabIndex={showreelStatus === 'playing' ? 0 : -1}
          className="absolute right-5 top-5 rounded-full border border-white/25 bg-black/50 px-4 py-2 text-xs text-white transition hover:border-[#E5A978] hover:text-[#E5A978] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E5A978] disabled:pointer-events-none"
        >
          Pular vídeo
        </button>
      </motion.div>
    </motion.main>
  );
}

export default Home;
