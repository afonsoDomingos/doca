import { ArrowUp, ChevronRight, Mail, MapPin, Phone, Globe } from 'lucide-react';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = [
    {
      title: 'Links Úteis', items: [
        { name: 'Home', path: '/' },
        { name: 'Serviços', path: '#servicos' },
        { name: 'Projetos', path: '#projetos' },
        { name: 'Portal do Cliente', path: '/portal/login' },
        { name: 'Política de Privacidade', path: '/privacy-policy' },
        { name: 'Área Restrita', path: '/admin/dashboard' }
      ]
    },
    {
      title: 'Serviços', items: [
        { name: 'Construção Civil', path: '#servicos' },
        { name: 'Manutenção Técnica', path: '#servicos' },
        { name: 'Consultoria', path: '#servicos' },
        { name: 'Gestão de Ativos', path: '#servicos' }
      ]
    }
  ];

  const socialLinks = [
    { Icon: FaFacebook, href: "https://web.facebook.com/profile.php?id=61580664191271" },
    { Icon: FaInstagram, href: "https://www.instagram.com/docamozambique" },
    { Icon: FaLinkedin, href: "https://www.linkedin.com/company/doca-mozambique/" }
  ];

  return (
    <footer style={{ backgroundColor: '#002244', color: 'white', paddingTop: '80px', position: 'relative' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '50px', marginBottom: '80px' }}>

          {/* Brand/About */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src="/logo-sem-fundo.png" alt="DOCA MOZAMBIQUE" style={{ height: '60px', objectFit: 'contain' }} />
            </div>
            <p style={{ color: '#E2E8F0', lineHeight: '1.8', fontSize: '1rem' }}>
              Soluções integradas em construção, manutenção e gestão de empreendimentos imobiliários de elite. Construindo o futuro com confiança e agilidade.
            </p>
            <div style={{ display: 'flex', gap: '15px' }}>
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'white', backgroundColor: 'rgba(255,255,255,0.1)', padding: '12px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: '0.3s' }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--accent-yellow)'; e.currentTarget.style.color = 'var(--primary-blue)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'white' }}
                >
                  <social.Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Dynamic Map Links */}
          {footerLinks.map((section, idx) => (
            <div key={idx}>
              <h4 style={{ fontSize: '1.2rem', color: 'var(--accent-yellow)', marginBottom: '30px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>
                {section.title}
              </h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {section.items.map((item, i) => (
                  <li key={i}>
                    {item.path.startsWith('#') ? (
                      <a href={item.path} style={{ color: '#CBD5E1', display: 'flex', alignItems: 'center', gap: '8px', transition: '0.3s', fontSize: '0.95rem' }}
                        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-yellow)'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#CBD5E1'}>
                        <ChevronRight size={14} style={{ color: 'var(--accent-yellow)' }} /> {item.name}
                      </a>
                    ) : (
                      <Link to={item.path} style={{ color: '#CBD5E1', display: 'flex', alignItems: 'center', gap: '8px', transition: '0.3s', fontSize: '0.95rem' }}
                        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-yellow)'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#CBD5E1'}>
                        <ChevronRight size={14} style={{ color: 'var(--accent-yellow)' }} /> {item.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Info Section */}
          <div>
            <h4 style={{ fontSize: '1.2rem', color: 'var(--accent-yellow)', marginBottom: '30px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Contactos
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', gap: '15px' }}>
                <div style={{ color: 'var(--accent-yellow)' }}><MapPin size={22} /></div>
                <div style={{ color: '#CBD5E1', fontSize: '0.95rem' }}>
                  Av. das Indústrias, Maputo<br />Moçambique
                </div>
              </div>
              <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                <div style={{ color: 'var(--accent-yellow)' }}><Phone size={20} /></div>
                <a href="tel:+258848580244" style={{ color: '#CBD5E1', fontSize: '0.95rem' }}>+258 84 858 0244</a>
              </div>
              <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                <div style={{ color: 'var(--accent-yellow)' }}><Mail size={20} /></div>
                <a href="mailto:geral@docacm.com" style={{ color: '#CBD5E1', fontSize: '0.95rem' }}>geral@docacm.com</a>
              </div>
              <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                <div style={{ color: 'var(--accent-yellow)' }}><Globe size={20} /></div>
                <span style={{ color: '#CBD5E1', fontSize: '0.95rem' }}>www.docacm.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', padding: '30px 0', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
          <p style={{ color: '#94A3B8', fontSize: '0.9rem' }}>
            &copy; {currentYear} DOCA MOZAMBIQUE, Lda. Todos os direitos reservados.
          </p>
          <div style={{ display: 'flex', gap: '30px', fontSize: '0.9rem' }}>
            <Link to="/terms-of-service" style={{ color: '#94A3B8' }}>Termos</Link>
            <Link to="/privacy-policy" style={{ color: '#94A3B8' }}>Privacidade</Link>
            <Link to="/privacy-policy" style={{ color: '#94A3B8' }}>Cookies</Link>
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
