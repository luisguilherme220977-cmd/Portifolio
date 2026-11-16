import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  Maximize2,
  MessageCircle,
  Minimize2,
  Monitor,
  Share2,
} from 'lucide-react';
import { LivingPortraitBackground } from '../components/LivingPortraitBackground';

const CINEMATIC_EASE = [0.16, 1, 0.3, 1] as const;
const WHATSAPP_URL =
  'https://wa.me/?text=Ol%C3%A1%20Luis%20Guilherme!%20Quero%20conversar%20sobre%20um%20projeto.';

function Home() {
  const [shareNotice, setShareNotice] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);

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
      <section id="inicio" className="relative isolate min-h-[100svh] overflow-hidden bg-black">
        <LivingPortraitBackground focusMode="loop" isPaused={false} />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(90deg,rgba(0,0,0,0.94)_0%,rgba(9,5,2,0.72)_34%,rgba(9,5,2,0.1)_72%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(0deg,rgba(0,0,0,0.82)_0%,transparent_29%,transparent_78%,rgba(0,0,0,0.28)_100%)]"
        />

        <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1440px] flex-col justify-between px-6 pb-7 pt-24 sm:px-12 sm:pb-9 lg:px-20">
          <div className="grid flex-1 items-center lg:grid-cols-12">
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
                <span className="block">VIBECODER</span>
                <span className="block">DIGITAL</span>
              </h1>

              <p className="mt-6 max-w-[470px] text-sm leading-6 text-white/75 sm:text-[15px] sm:leading-6">
                Vibecoder de Maceió, Alagoas, com 15 anos de idade. Construo sites e experiências
                digitais com velocidade, estilo e zero enrolação. Não é só um site: é a presença
                digital da sua empresa em outro nível.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <motion.a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2, boxShadow: '0 12px 34px rgba(229,169,120,0.25)' }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex min-h-11 items-center gap-2.5 rounded-full bg-[#E5A978] px-5 py-3 text-xs font-bold uppercase tracking-[0.06em] text-[#170F09] transition-colors hover:bg-[#F2BD8D]"
                >
                  <MessageCircle size={16} fill="currentColor" aria-hidden="true" />
                  Falar no WhatsApp
                  <ArrowUpRight size={15} aria-hidden="true" />
                </motion.a>

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

          <div className="grid items-end gap-5 md:grid-cols-[minmax(0,480px)_1fr]">
            <motion.article
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: CINEMATIC_EASE, delay: 0.45 }}
              className="flex items-center gap-4 rounded-2xl border border-white/15 bg-[#0b0907]/90 p-4 shadow-[0_20px_70px_rgba(0,0,0,0.4)] backdrop-blur-xl sm:gap-5 sm:p-5"
            >
              <div className="relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[radial-gradient(circle,rgba(229,169,120,0.2),rgba(22,16,11,0.96)_72%)] sm:h-28 sm:w-32">
                <div className="absolute inset-x-5 top-6 h-12 rounded-md border border-[#E5A978]/40 bg-black/75 shadow-[0_0_24px_rgba(229,169,120,0.16)] sm:inset-x-6 sm:top-7">
                  <div className="space-y-1.5 p-2">
                    <div className="h-1 w-8 rounded-full bg-[#E5A978]" />
                    <div className="h-1 w-12 rounded-full bg-[#E5A978]/50" />
                    <div className="mt-2 h-3 w-3 rounded-full border border-[#E5A978]/70" />
                  </div>
                </div>
                <Monitor className="absolute bottom-4 h-5 w-5 text-[#E5A978]/70" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <p className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-[#E5A978] sm:text-[10px]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#E5A978]" />
                  Experiência digital
                </p>
                <h2 className="mt-1.5 text-xs font-semibold uppercase tracking-wide text-white sm:text-sm">
                  Presença digital sob medida
                </h2>
                <p className="mt-1.5 max-w-[290px] text-xs leading-5 text-white/60">
                  Site rápido, moderno e feito para fortalecer a presença da sua marca na internet.
                </p>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex min-h-10 items-center gap-2 rounded-lg border border-[#E5A978]/60 px-3.5 py-2 text-xs text-white transition hover:bg-[#E5A978]/10 hover:text-[#E5A978] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E5A978]"
                >
                  Falar comigo <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              </div>
            </motion.article>

            <div className="flex flex-col items-start gap-3 pb-1 text-[10px] text-white/70 sm:items-end sm:text-[11px]">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex min-h-9 items-center gap-2 rounded-full border border-white/15 bg-black/35 px-3.5 font-mono uppercase tracking-[0.1em] backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#E5A978]" />
                  Maceió, AL
                </span>
                <span className="inline-flex min-h-9 items-center rounded-full border border-[#E5A978]/35 bg-black/35 px-3.5 font-mono uppercase tracking-[0.08em] text-[#E5A978] backdrop-blur-md">
                  Vibecoder&nbsp; • &nbsp;15 anos
                </span>
              </div>
              <p className="max-w-lg leading-5 sm:text-right">
                <span className="mr-2 text-[#E5A978]">●</span>
                Missão: crescer com cada projeto e dar uma vida melhor para minha família.
              </p>
            </div>
          </div>
        </div>

      </section>
    </motion.main>
  );
}

export default Home;
