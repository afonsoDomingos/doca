import React, { useState, useEffect } from 'react';
import { Phone, Mail, Menu, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = ({ onOpenQuote }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Serviços', href: '#servicos' },
    { name: 'Projetos', href: '#projetos' },
    { name: 'Sobre', href: '#sobre' },
    { name: 'Contacto', href: '#contacto' },
  ];

  return (
    <header 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 1000,
        backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
        boxShadow: isScrolled ? 'var(--shadow-sm)' : 'none',
        backdropFilter: isScrolled ? 'blur(10px)' : 'none',
        transition: 'var(--transition-smooth)',
        padding: isScrolled ? '10px 0' : '20px 0',
      }}
    >
      {/* Top Bar */}
      {!isScrolled && (
        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '5px 0',
          borderBottom: '1px solid #eee',
          fontSize: '0.85rem',
          color: 'var(--text-muted)'
        }}>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '20px' }}>
              <a href="https://wa.me/258848580244" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Phone size={14} /> +258 848580244
              </a>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Mail size={14} /> geral@docacm.com
              </span>
            </div>
            <div style={{ display: 'flex', gap: '15px' }}>
              <a href="#">PT</a> | <a href="#">EN</a>
            </div>
          </div>
        </div>
      )}

      {/* Main Header */}
      <div className="container" style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginTop: isScrolled ? '0' : '10px'
      }}>
        {/* Logo */}
        <div style={{ 
          fontSize: '1.8rem', 
          fontWeight: '800', 
          fontFamily: 'Montserrat',
          color: isScrolled ? 'var(--primary-blue)' : 'white',
          display: 'flex',
          alignItems: 'center'
        }}>
          DOCA <span style={{ color: 'var(--accent-yellow)' }}>CONSTRUÇÃO</span>
        </div>

        {/* Desktop Navigation */}
        <nav style={{ display: 'none' }} className="desktop-only">
          <ul style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
            {navLinks.map((link) => (
              <li key={link.name}>
                <a 
                  href={link.href} 
                  style={{ 
                    fontWeight: '600', 
                    color: isScrolled ? 'var(--primary-blue)' : 'white',
                    position: 'relative',
                    transition: 'var(--transition-smooth)'
                  }}
                  onMouseEnter={(e) => e.target.style.color = 'var(--accent-yellow)'}
                  onMouseLeave={(e) => e.target.style.color = isScrolled ? 'var(--primary-blue)' : 'white'}
                >
                  {link.name}
                </a>
              </li>
            ))}
            <li>
              <button 
                onClick={onOpenQuote}
                className="btn btn-primary" 
                style={{ padding: '10px 20px', fontSize: '0.9rem', border: 'none', cursor: 'pointer' }}
              >
                Solicitar Orçamento
              </button>
            </li>
          </ul>
        </nav>

        {/* Mobile Toggle */}
        <button 
          style={{ display: 'block', color: isScrolled ? 'var(--primary-blue)' : 'white' }} 
          className="mobile-only"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{
              overflow: 'hidden',
              backgroundColor: 'white',
              position: 'absolute',
              top: '100%',
              left: 0,
              width: '100%',
              boxShadow: 'var(--shadow-lg)',
              borderTop: '1px solid #eee'
            }}
          >
            <ul style={{ padding: '20px' }}>
              {navLinks.map((link) => (
                <li key={link.name} style={{ margin: '15px 0' }}>
                  <a 
                    href={link.href} 
                    style={{ fontSize: '1.1rem', fontWeight: '600', display: 'flex', justifyContent: 'space-between' }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name} <ChevronRight size={18} />
                  </a>
                </li>
              ))}
              <li style={{ marginTop: '20px' }}>
                <button 
                  onClick={() => { setIsMobileMenuOpen(false); onOpenQuote(); }}
                  className="btn btn-primary" 
                  style={{ width: '100%', display: 'block', textAlign: 'center', border: 'none', cursor: 'pointer' }}
                >
                  Solicitar Orçamento
                </button>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (min-width: 992px) {
          .desktop-only { display: block !important; }
          .mobile-only { display: none !important; }
        }
        @media (max-width: 991px) {
          .desktop-only { display: none !important; }
          .mobile-only { display: block !important; }
        }
      `}} />
    </header>
  );
};

export default Header;
