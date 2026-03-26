import React from 'react';
import { ArrowUp, ChevronRight } from 'lucide-react';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = [
    { title: 'Links Úteis', items: ['Home', 'Serviços', 'Projetos', 'Sobre Nós', 'Contactos'] },
    { title: 'Serviços', items: ['Construção Civil', 'Manutenção Especializada', 'Consultoria Técnica', 'Limpeza Industrial', 'Gestão de Ativos'] },
    { title: 'Suporte', items: ['Termos e Condições', 'Política de Privacidade', 'FAQ', 'Ouvidoria'] }
  ];

  return (
    <footer style={{ backgroundColor: '#002244', color: 'white', paddingTop: '80px', position: 'relative' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '50px', marginBottom: '80px' }}>
          
          {/* Brand/About */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            <div style={{ fontSize: '1.8rem', fontWeight: '800', fontFamily: 'Montserrat', color: 'white' }}>
              DOCA <span style={{ color: 'var(--accent-yellow)' }}>CONSTRUÇÃO</span>
            </div>
            <p style={{ color: '#E2E8F0', lineHeight: '1.8', fontSize: '1rem' }}>
              Soluções integradas em construção, manutenção e gestão de empreendimentos imobiliários de elite. Construindo o futuro com confiança e agilidade.
            </p>
            <div style={{ display: 'flex', gap: '15px' }}>
              {[FaFacebook, FaInstagram, FaLinkedin, FaTwitter].map((Icon, i) => (
                <a key={i} href="#" style={{ color: 'white', backgroundColor: 'rgba(255,255,255,0.1)', padding: '12px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: '0.3s' }}
                   onMouseEnter={(e) => {e.currentTarget.style.backgroundColor = 'var(--accent-yellow)'; e.currentTarget.style.color = 'var(--primary-blue)'}}
                   onMouseLeave={(e) => {e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'white'}}>
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Dynamic Map Links */}
          {footerLinks.map((section, idx) => (
            <div key={idx}>
              <h4 style={{ fontSize: '1.4rem', color: 'var(--accent-yellow)', marginBottom: '30px', position: 'relative', display: 'inline-block' }}>
                {section.title}
                <div style={{ position: 'absolute', bottom: '-10px', left: 0, width: '40px', height: '2px', backgroundColor: 'var(--accent-yellow)' }}></div>
              </h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {section.items.map((item, i) => (
                  <li key={i}>
                    <a href="#" style={{ color: '#CBD5E1', display: 'flex', alignItems: 'center', gap: '8px', transition: '0.3s' }}
                       onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
                       onMouseLeave={(e) => e.currentTarget.style.color = '#CBD5E1'}>
                      <ChevronRight size={14} /> {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', padding: '30px 0', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
          <p style={{ color: '#94A3B8', fontSize: '0.9rem' }}>
            &copy; {currentYear} DOCA CONSTRUÇÃO E MANUTENÇÃO, Lda. Todos os direitos reservados.
          </p>
          <div style={{ display: 'flex', gap: '30px', fontSize: '0.9rem' }}>
            <a href="#" style={{ color: '#94A3B8' }}>Legal</a>
            <a href="#" style={{ color: '#94A3B8' }}>Cookies</a>
          </div>
          <button 
            onClick={scrollToTop}
            style={{ 
              backgroundColor: 'var(--accent-yellow)', 
              color: 'var(--primary-blue)', 
              width: '50px', 
              height: '50px', 
              borderRadius: '12px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              boxShadow: 'var(--shadow-lg)' 
            }}
          >
            <ArrowUp size={24} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
