import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'true');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          style={{
            position: 'fixed',
            bottom: '24px',
            left: '24px',
            right: '24px',
            zIndex: 9999,
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid #e2e8f0',
            padding: '24px',
            borderRadius: '24px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            maxWidth: '800px',
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '24px',
            justifyContent: 'space-between'
          }} className="cookie-banner-content">
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                backgroundColor: 'var(--accent-yellow)',
                color: 'var(--primary-blue)',
                padding: '12px',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Cookie size={24} />
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '800', color: 'var(--primary-blue)' }}>Valorizamos a sua Privacidade</h4>
                <p style={{ margin: '4px 0 0', fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                  Utilizamos cookies para melhorar a sua experiência e analisar o nosso tráfego. Ao continuar a navegar, você concorda com a nossa <Link to="/privacy-policy" style={{ color: 'var(--accent-yellow-dark)', fontWeight: '700', textDecoration: 'underline' }}>Política de Privacidade</Link>.
                </p>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '12px', flexShrink: 0 }}>
              <button
                onClick={handleAccept}
                style={{
                  backgroundColor: 'var(--primary-blue)',
                  color: 'white',
                  padding: '12px 28px',
                  borderRadius: '12px',
                  fontWeight: '700',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                Aceitar Tudo
              </button>
              <button
                onClick={() => setIsVisible(false)}
                style={{
                  backgroundColor: '#f1f5f9',
                  color: '#64748b',
                  padding: '12px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <X size={20} />
              </button>
            </div>
          </div>
          
          <style>{`
            @media (max-width: 768px) {
              .cookie-banner-content {
                flex-direction: column;
                text-align: center;
                padding: 20px;
              }
              .cookie-banner-content > div:first-child {
                flex-direction: column;
              }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
