import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const RotatingText = () => {
  const words = ["Qualidade", "Segurança", "Inovação", "Excelência", "Compromisso"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={words[index]}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{ color: 'var(--accent-yellow)', display: 'inline-block', marginLeft: '10px' }}
      >
        {words[index]}
      </motion.span>
    </AnimatePresence>
  );
};

const DynamicTitle = () => {
  const titles = [
    <>Soluções Integradas em <span style={{ color: 'var(--accent-yellow)' }}>Construção</span><br />
      <span style={{ color: 'var(--accent-yellow)' }}>e Manutenção</span></>,
    <>Construindo e fortalecendo <br /> o seu <span style={{ color: 'var(--accent-yellow)' }}>Património</span></>
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % titles.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ minHeight: 'clamp(140px, 22vw, 260px)', marginBottom: '20px' }}>
      <AnimatePresence mode="wait">
        <motion.h1
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          style={{
            fontSize: 'clamp(2rem, 6vw, 4rem)',
            fontFamily: 'Montserrat',
            fontWeight: '800',
            lineHeight: '1.25'
          }}
        >
          {titles[index]}
        </motion.h1>
      </AnimatePresence>
    </div>
  );
};

const Hero = () => {
  return (
    <section
      id="home"
      style={{
        position: 'relative',
        height: '100vh',
        minHeight: '600px',
        display: 'flex',
        alignItems: 'center',
        padding: 0,
        overflow: 'hidden',
        color: 'white',
      }}
    >
      {/* Animated Background Image */}
      <div style={{
        position: 'absolute',
        top: '-15%',
        left: 0,
        width: '100%',
        height: '130%',
        backgroundImage: 'url("/bannerdoca.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        animation: 'heroPan 12s ease-in-out infinite alternate',
        zIndex: 0
      }} />
      {/* Dark Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(rgba(0, 51, 102, 0.65), rgba(0, 30, 80, 0.4))',
        zIndex: 1
      }} />
      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          style={{ maxWidth: '800px' }}
        >
          <DynamicTitle />

          <div style={{
            fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
            fontWeight: '600',
            marginBottom: '40px',
            display: 'flex',
            alignItems: 'center',
            gap: '15px'
          }}>
            Nosso pilar é o <RotatingText />
          </div>

          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '130px' }}>
            <motion.a
              href="https://wa.me/258848580244"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 1 }}
              className="btn btn-primary"
              style={{ padding: '15px 35px', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '10px' }}
            >
              Contacte-nos <ChevronRight size={20} />
            </motion.a>
            <motion.a
              href="#servicos"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 1 }}
              className="btn btn-outline"
              style={{ padding: '15px 35px', fontSize: '1.1rem' }}
            >
              Ver Nossos Serviços
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Decorative SVG Overlay */}
      <div style={{
        position: 'absolute',
        bottom: '-2px',
        left: 0,
        width: '100%',
        zIndex: 5
      }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="white" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,122.7C960,117,1056,171,1152,197.3C1248,224,1344,224,1392,224L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes heroPan {
          0%   { transform: translateY(0%); }
          100% { transform: translateY(-12%); }
        }
      `}} />
    </section>
  );
};

export default Hero;
