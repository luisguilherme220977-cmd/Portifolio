import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import NavBar from './NavBar';
import { ParallaxBackground } from './ParallaxBackground';
import Home from '../pages/Home';
import About from '../pages/About';

const Layout: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const sectionId = decodeURIComponent(location.hash.slice(1));
    if (!sectionId) return;

    const timeout = window.setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (!section) return;

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      section.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
    }, 80);

    return () => window.clearTimeout(timeout);
  }, [location.hash, location.pathname]);

  return (
    <>
      <NavBar />
      <ParallaxBackground />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/sobre" element={<Navigate to="/about" replace />} />
          <Route path="/trabalhos" element={<Navigate to="/about#projetos" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </>
  );
};

const AppRouter: React.FC = () => (
  <BrowserRouter>
    <Layout />
  </BrowserRouter>
);

export default AppRouter;
