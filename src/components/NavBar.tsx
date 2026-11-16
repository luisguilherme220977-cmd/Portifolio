import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const WHATSAPP_URL =
  'https://wa.me/?text=Ol%C3%A1%20Luis%20Guilherme%20-%20Quero%20conversar%20sobre%20um%20projeto';

const NavBar: React.FC = () => {
  return (
    <nav className="fixed left-0 top-0 z-30 w-full border-b border-white/[0.08] bg-black/35 backdrop-blur-lg">
      <div className="mx-auto flex h-[68px] max-w-[1440px] items-center justify-between px-6 sm:px-12 lg:px-20">
        <Link
          to="/#inicio"
          aria-label="Luis Guilherme — início"
          className="font-mono text-xs font-semibold tracking-[0.12em] text-white transition hover:text-[#E5A978] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E5A978]"
        >
          LUIS GUILHERME <span className="text-[#E5A978]">//</span>
        </Link>

        <motion.a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ y: -1, borderColor: 'rgba(229,169,120,0.9)' }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#E5A978]/55 px-3.5 py-2 text-[11px] font-medium text-[#E5A978] transition-colors hover:bg-[#E5A978]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E5A978] sm:px-4 sm:text-xs"
        >
          <MessageCircle size={14} aria-hidden="true" />
          <span>Falar no WhatsApp</span>
          <ArrowUpRight size={13} aria-hidden="true" />
        </motion.a>
      </div>
    </nav>
  );
};

export default NavBar;
