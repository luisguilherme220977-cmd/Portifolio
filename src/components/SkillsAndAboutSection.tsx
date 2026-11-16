/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import {
  Code2,
  Wrench,
  GraduationCap,
  MapPin,
  Rocket,
  ArrowRight,
} from 'lucide-react';

const CINEMATIC_EASE = [0.16, 1, 0.3, 1] as const;

/** Card com estilo HUD futurista e cantos destacados em âmbar/laranja */
interface HudCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

function HudCard({ children, className = '', delay = 0 }: HudCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.75, ease: CINEMATIC_EASE, delay }}
      whileHover={{
        y: -4,
        borderColor: 'rgba(229, 169, 120, 0.45)',
        boxShadow: '0 12px 32px rgba(0,0,0,0.85), 0 0 25px rgba(229,169,120,0.18)',
      }}
      className={`relative rounded-2xl bg-[#0b0907]/90 border border-[#2a231b] p-5 sm:p-6 backdrop-blur-md overflow-hidden transition-colors duration-300 group ${className}`}
    >
      {/* Cantoneira superior esquerda em âmbar */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#E5A978] rounded-tl-xl pointer-events-none group-hover:border-[#ff9f43] transition-colors" />
      {/* Cantoneira inferior direita em âmbar */}
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#E5A978] rounded-br-xl pointer-events-none group-hover:border-[#ff9f43] transition-colors" />

      {/* Brilho radial ambiente sutil ao passar o cursor */}
      <div className="absolute -top-10 -right-10 w-28 h-28 bg-[#E5A978]/5 rounded-full blur-2xl pointer-events-none group-hover:bg-[#E5A978]/15 transition-all" />

      {children}
    </motion.div>
  );
}

/** Logos SVG fiéis para as tags de ferramentas e linguagens */
function CursorLogo() {
  return (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0" fill="currentColor">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

function ClaudeLogo() {
  return (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-[#D97706] shrink-0" fill="currentColor">
      <path d="M12 2l1.6 6.8 6.8 1.6-6.8 1.6L12 22l-1.6-6.8-6.8-1.6 6.8-1.6L12 2z" />
    </svg>
  );
}

function ReplitLogo() {
  return (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-[#F26207] shrink-0" fill="currentColor">
      <path d="M4 6h7v4H4zm0 8h7v4H4zm8-4h8v4h-8z" />
    </svg>
  );
}

function PythonLogo() {
  return (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0" fill="currentColor">
      <path d="M11.9 2c-3.8 0-3.6 1.6-3.6 1.6l.04 1.7h3.6v.5H4.8C2 5.8 2 9.6 2 9.6s.4 3.7 3.2 3.7h1.9v-2.7c0-1.8 1.6-1.8 1.6-1.8h3.6c1.6 0 1.6-1.6 1.6-1.6V3.6C13.9 2 11.9 2 11.9 2zM9.5 3.3a.7.7 0 110 1.4.7.7 0 010-1.4zm2.6 18.7c3.8 0 3.6-1.6 3.6-1.6l-.04-1.7h-3.6v-.5h7.1c2.8 0 2.8-3.8 2.8-3.8s-.4-3.7-3.2-3.7h-1.9v2.7c0 1.8-1.6 1.8-1.6 1.8h-3.6c-1.6 0-1.6 1.6-1.6 1.6v3.6c0 1.6 2 1.6 2 1.6zm2.4-1.3a.7.7 0 110-1.4.7.7 0 010 1.4z" fill="#3776AB" />
      <path d="M12.1 22c3.8 0 3.6-1.6 3.6-1.6l-.04-1.7h-3.6v-.5h7.1c2.8 0 2.8-3.8 2.8-3.8s-.4-3.7-3.2-3.7h-1.9v2.7c0 1.8-1.6 1.8-1.6 1.8h-3.6c-1.6 0-1.6 1.6-1.6 1.6v3.6c0 1.6 2 1.6 2 1.6z" fill="#FFD43B" />
    </svg>
  );
}

function JsLogo() {
  return (
    <div className="w-3.5 h-3.5 bg-[#F7DF1E] text-black font-black text-[8px] flex items-center justify-center rounded-[2px] leading-none shrink-0 font-sans">
      JS
    </div>
  );
}

function TsLogo() {
  return (
    <div className="w-3.5 h-3.5 bg-[#3178C6] text-white font-bold text-[8px] flex items-center justify-center rounded-[2px] leading-none shrink-0 font-sans">
      TS
    </div>
  );
}

function VsCodeLogo() {
  return (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-[#007ACC] shrink-0" fill="currentColor">
      <path d="M17.5 2.5L7.9 10.7 3.5 7.4 1.5 8.6l3.8 3.4-3.8 3.4 2 1.2 4.4-3.3 9.6 8.2 5-2.5V5l-5-2.5zm1.5 14.7l-7-6.2 7-6.2v12.4z" />
    </svg>
  );
}

function GitLogo() {
  return (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-[#F05032] shrink-0" fill="currentColor">
      <path d="M21.6 10.6L13.4 2.4c-.6-.6-1.5-.6-2.1 0L9.4 4.3l2.8 2.8c.6-.2 1.3-.1 1.8.4.5.5.6 1.2.4 1.8l2.7 2.7c.6-.2 1.3-.1 1.8.4.7.7.7 1.9 0 2.6-.7.7-1.9.7-2.6 0-.5-.5-.7-1.3-.4-1.9l-2.5-2.5v5.8c.2.1.4.3.5.5.7.7.7 1.9 0 2.6-.7.7-1.9.7-2.6 0-.7-.7-.7-1.9 0-2.6.2-.2.4-.4.6-.5V8.5L5.7 12c-.6.6-.6 1.5 0 2.1l8.2 8.2c.6.6 1.5.6 2.1 0l5.6-5.6c.6-.6.6-1.5 0-2.1z" />
    </svg>
  );
}

function DockerLogo() {
  return (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-[#2496ED] shrink-0" fill="currentColor">
      <path d="M13.9 10.4h-1.5V8.9h1.5v1.5zm-2.1 0h-1.5V8.9h1.5v1.5zm-2.1 0H8.2V8.9h1.5v1.5zm-2.1 0H6.1V8.9h1.5v1.5zm6.3-2.1h-1.5V6.8h1.5v1.5zm-2.1 0h-1.5V6.8h1.5v1.5zm-2.1 0H9.7V6.8h1.5v1.5zm6.3 0h-1.5V6.8h1.5v1.5zm5.7 3.3c-.3-.2-1.3-.3-2.1.2-.2-.6-.6-1.1-1.1-1.4l-.5-.3-.3.5c-.3.5-.4 1.2-.2 1.8-.4.3-1.1.4-1.8.4H3.8c-.4 0-.8.1-1.2.3-.4.2-.8.5-1 .9-.3.6-.4 1.3-.4 2 0 1.2.4 2.4 1.1 3.4 1.3 1.8 3.5 3 6.1 3 4.8 0 8.6-2.6 10-6.9.5 0 1.7-.1 2.3-.8.3-.3.5-.8.5-1.3 0-.6-.3-1.1-.9-1.2z" />
    </svg>
  );
}

export function SkillsAndAboutSection() {
  return (
    <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 py-16 sm:px-12 lg:px-20 lg:py-24">
      {/* ======================================================== */}
      {/* 1. SEÇÃO DE SKILLS                                        */}
      {/* ======================================================== */}
      <section id="habilidades" aria-label="Habilidades e Tecnologias" className="relative scroll-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Lado Esquerdo: Título e Descrição */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: CINEMATIC_EASE }}
            className="lg:col-span-4 flex flex-col items-start"
          >
            <h2 className="font-display text-[clamp(2rem,3vw,2.75rem)] leading-[1.2] tracking-[0.03em] uppercase text-white">
              <span>SKILLS </span>
              <span className="text-[#E5A978]">//</span>
            </h2>

            <p className="mt-4 text-[14.5px] leading-[1.6] text-[#B3AFA9] max-w-[340px]">
              Vibecoder, linguagens e ferramentas que utilizo para criar projetos incríveis.
            </p>

            <motion.a
              href="#servicos"
              whileHover={{
                scale: 1.04,
                borderColor: '#E5A978',
                color: '#E5A978',
                boxShadow: '0 0 20px rgba(229,169,120,0.3)',
              }}
              whileTap={{ scale: 0.96 }}
              className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#E5A978]/60 bg-black/60 backdrop-blur-sm text-[12.5px] font-medium tracking-[0.04em] text-white hover:text-[#E5A978] transition-colors cursor-pointer"
            >
              <span>Ver todas as skills</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#E5A978]" />
            </motion.a>
          </motion.div>

          {/* Lado Direito: Grid com os 3 Cards de Skills */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {/* Card 1: Vibecoder */}
            <HudCard delay={0.1}>
              <div className="flex items-center gap-2 text-[#E5A978]">
                <Code2 className="w-4 h-4" />
                <h3 className="text-[14px] font-semibold text-white tracking-wide">Vibecoder</h3>
              </div>
              <p className="mt-2 text-[12.5px] leading-[1.5] text-[#9B9894] min-h-[38px]">
                Desenvolvimento com IA para acelerar ideias.
              </p>
              <div className="mt-5 pt-3.5 border-t border-white/10 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 text-[11.5px] text-[#D8D5D0]">
                  <CursorLogo /> Cursor
                </span>
                <span className="inline-flex items-center gap-1.5 text-[11.5px] text-[#D8D5D0]">
                  <ClaudeLogo /> Claude
                </span>
                <span className="inline-flex items-center gap-1.5 text-[11.5px] text-[#D8D5D0]">
                  <ReplitLogo /> Replit
                </span>
              </div>
            </HudCard>

            {/* Card 2: Linguagens */}
            <HudCard delay={0.2}>
              <div className="flex items-center gap-2 text-[#E5A978]">
                <Code2 className="w-4 h-4" />
                <h3 className="text-[14px] font-semibold text-white tracking-wide">Linguagens</h3>
              </div>
              <p className="mt-2 text-[12.5px] leading-[1.5] text-[#9B9894] min-h-[38px]">
                As principais linguagens do desenvolvimento.
              </p>
              <div className="mt-5 pt-3.5 border-t border-white/10 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 text-[11.5px] text-[#D8D5D0]">
                  <PythonLogo /> Python
                </span>
                <span className="inline-flex items-center gap-1.5 text-[11.5px] text-[#D8D5D0]">
                  <JsLogo /> JavaScript
                </span>
                <span className="inline-flex items-center gap-1.5 text-[11.5px] text-[#D8D5D0]">
                  <TsLogo /> TypeScript
                </span>
              </div>
            </HudCard>

            {/* Card 3: Ferramentas */}
            <HudCard delay={0.3}>
              <div className="flex items-center gap-2 text-[#E5A978]">
                <Wrench className="w-4 h-4" />
                <h3 className="text-[14px] font-semibold text-white tracking-wide">Ferramentas</h3>
              </div>
              <p className="mt-2 text-[12.5px] leading-[1.5] text-[#9B9894] min-h-[38px]">
                Ferramentas que uso no meu fluxo de desenvolvimento.
              </p>
              <div className="mt-5 pt-3.5 border-t border-white/10 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 text-[11.5px] text-[#D8D5D0]">
                  <VsCodeLogo /> VS Code
                </span>
                <span className="inline-flex items-center gap-1.5 text-[11.5px] text-[#D8D5D0]">
                  <GitLogo /> Git
                </span>
                <span className="inline-flex items-center gap-1.5 text-[11.5px] text-[#D8D5D0]">
                  <DockerLogo /> Docker
                </span>
              </div>
            </HudCard>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* LINHA DIVISÓRIA AMBIENTE COM LASER DOURADO                */}
      {/* ======================================================== */}
      <div className="relative w-full my-16 lg:my-24">
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#E5A978]/35 to-transparent" />
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-64 h-[2px] bg-[#E5A978]/50 blur-[3px]" />
      </div>

      {/* ======================================================== */}
      {/* 2. SEÇÃO ABOUT                                            */}
      {/* ======================================================== */}
      <section id="sobre" aria-label="Sobre Mim" className="relative scroll-mt-24 overflow-visible">
        {/* Marca d'água técnica '+' sutil no canto inferior esquerdo */}
        <span
          className="absolute -bottom-6 -left-3 text-[#E5A978]/40 font-mono text-xl select-none pointer-events-none"
          aria-hidden="true"
        >
          +
        </span>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Lado Esquerdo: Título e Descrição */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: CINEMATIC_EASE }}
            className="lg:col-span-5 flex flex-col items-start z-10"
          >
            <h2 className="font-display text-[clamp(2rem,3vw,2.75rem)] leading-[1.2] tracking-[0.03em] uppercase text-white">
              <span>ABOUT </span>
              <span className="text-[#E5A978]">//</span>
            </h2>

            <p className="mt-5 text-[14.5px] leading-[1.65] text-[#B3AFA9] max-w-[440px]">
              Vibecoder de Maceió, Alagoas, com 15 anos de idade. Construo sites e experiências digitais
              com velocidade, estilo e zero enrolação. Não é só um site, é a presença digital da sua
              empresa em outro nível.
            </p>

            <motion.a
              href="https://wa.me/?text=Ol%C3%A1%20Luis%20Guilherme!%20Gostaria%20de%20saber%20mais%20sobre%20seu%20trabalho."
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{
                scale: 1.04,
                borderColor: '#E5A978',
                color: '#E5A978',
                boxShadow: '0 0 20px rgba(229,169,120,0.3)',
              }}
              whileTap={{ scale: 0.96 }}
              className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#E5A978]/60 bg-black/60 backdrop-blur-sm text-[12.5px] font-medium tracking-[0.04em] text-white hover:text-[#E5A978] transition-colors cursor-pointer"
            >
              <span>Saiba mais sobre mim</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#E5A978]" />
            </motion.a>
          </motion.div>

          {/* Centro/Direita: 4 Cards de Informações em Grid 2x2 */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4 z-10">
            {/* Card 1: Estudando */}
            <HudCard delay={0.15}>
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#E5A978]/10 border border-[#E5A978]/25 flex items-center justify-center text-[#E5A978] shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[10.5px] font-mono tracking-widest text-[#E5A978] uppercase">
                    ESTUDANDO
                  </span>
                  <span className="block text-[13.5px] font-semibold text-white mt-0.5">
                    Ensino Médio
                  </span>
                </div>
              </div>
            </HudCard>

            {/* Card 2: Baseado em */}
            <HudCard delay={0.25}>
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#E5A978]/10 border border-[#E5A978]/25 flex items-center justify-center text-[#E5A978] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[10.5px] font-mono tracking-widest text-[#E5A978] uppercase">
                    BASEADO EM
                  </span>
                  <span className="block text-[13.5px] font-semibold text-white mt-0.5">
                    Maceió, Alagoas
                  </span>
                </div>
              </div>
            </HudCard>

            {/* Card 3: Áreas de Atuação */}
            <HudCard delay={0.35}>
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#E5A978]/10 border border-[#E5A978]/25 flex items-center justify-center text-[#E5A978] shrink-0">
                  <Code2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[10.5px] font-mono tracking-widest text-[#E5A978] uppercase">
                    ÁREAS DE ATUAÇÃO
                  </span>
                  <span className="block text-[13.5px] font-semibold text-white mt-0.5">
                    Desenvolvimento Web
                  </span>
                </div>
              </div>
            </HudCard>

            {/* Card 4: Foco */}
            <HudCard delay={0.45}>
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#E5A978]/10 border border-[#E5A978]/25 flex items-center justify-center text-[#E5A978] shrink-0">
                  <Rocket className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[10.5px] font-mono tracking-widest text-[#E5A978] uppercase">
                    FOCO
                  </span>
                  <span className="block text-[13.5px] font-semibold text-white mt-0.5">
                    Inovação e Tecnologia
                  </span>
                </div>
              </div>
            </HudCard>
          </div>

          {/* Extremidade Direita: Planeta Iluminado Oficial */}
          <div className="lg:col-span-2 relative flex items-center justify-center lg:justify-end overflow-visible">
            <motion.div
              initial={{ opacity: 0, scale: 0.85, x: 25 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1.1, ease: CINEMATIC_EASE }}
              className="relative w-56 h-56 sm:w-72 sm:h-72 lg:w-[380px] lg:h-[340px] lg:-mr-12 pointer-events-none flex items-center justify-center"
            >
              {/* Brilho radial âmbar atrás do planeta */}
              <div className="absolute top-1/4 left-1/4 w-44 h-44 bg-[#E5A978]/25 rounded-full blur-3xl pointer-events-none" />

              {/* Imagem Real do Planeta em alta resolução com flutuação suave */}
              <motion.img
                src="/assets/earth-orange.png"
                alt="Planeta iluminado com conexões globais"
                animate={{
                  y: [-3.5, 3.5, -3.5],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 5.5,
                  ease: 'easeInOut',
                }}
                className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_45px_rgba(229,169,120,0.3)]"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
