import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Users, FolderKanban, Trophy } from 'lucide-react';

const CounterStat = ({ target, label, icon: Icon, suffix = '+' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setCount(0);
        const duration = 2000;
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            setCount(target);
            clearInterval(timer);
          } else {
            setCount(Math.floor(current));
          }
        }, duration / steps);
      } else {
        setCount(0);
      }
    }, { threshold: 0.2 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      style={{ textAlign: 'center', padding: '0 30px' }}
    >
      <div style={{ color: 'var(--accent-yellow)', marginBottom: '10px' }}>
        <Icon size={36} />
      </div>
      <div style={{ fontSize: '3rem', fontWeight: '800', color: 'white', lineHeight: 1 }}>
        {count}{suffix}
      </div>
      <div style={{ color: '#CBD5E1', fontSize: '1rem', marginTop: '8px', fontWeight: '500' }}>{label}</div>
    </motion.div>
  );
};

const About = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [banners, setBanners] = useState([]);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  const API_URL = import.meta.env.VITE_API_BASE_URL || (import.meta.env.DEV ? 'http://localhost:5000' : '');

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await fetch(`${API_URL}/api/banners?type=about`);
        if (res.ok) {
          const data = await res.json();
          setBanners(data);
        }
      } catch (err) {
        console.error('Error fetching banners:', err);
      }
    };
    fetchBanners();
  }, []);

  // Auto-play slider
  useEffect(() => {
    if (banners.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentBannerIndex(prev => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [banners]);

  return (
    <section id="sobre" style={{ backgroundColor: '#F9FAFB' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '50px', alignItems: 'center' }}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div style={{ backgroundColor: 'var(--primary-blue)', color: 'white', padding: '10px 20px', display: 'inline-block', borderRadius: '4px', marginBottom: '15px', fontSize: '0.9rem', fontWeight: 'bold' }}>
              Nossa História
            </div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '25px', color: 'var(--primary-blue)' }}>
              Sobre a <span style={{ color: 'var(--accent-yellow-dark)' }}>DOCA MOZAMBIQUE</span>
            </h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
              A DOCA MOZAMBIQUE é uma empresa líder no mercado de construção civil, 
              especializada em fornecer soluções inovadoras e de alta qualidade para projetos de 
              grande e média escala. Fundada com a visão de transformar o cenário urbano através de 
              excelência em engenharia e gestão de projetos.
            </p>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
              Com uma equipe altamente qualificada, focamos na sustentabilidade e eficiência técnica, 
              garantindo que cada empreendimento seja entregue dentro dos prazos e com os mais altos 
              padrões de segurança.
            </p>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  style={{ overflow: 'hidden' }}
                >
                  <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
                    Nosso compromisso vai além do canteiro de obras. Acreditamos na construção de 
                    relacionamentos duradouros com nossos clientes através de transparência e 
                    ética profissional inabalável. Estamos presentes em diversos setores, desde 
                    edifícios residenciais de luxo até complexos industriais de alta complexidade.
                  </p>
                  <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
                    Atualmente, a DOCA expande suas operações para oferecer serviços de consultoria 
                    estratégica e Facility Management, consolidando-se como parceira de escolha 
                    para proprietários de edifícios em busca de confiabilidade 24/7.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              style={{ 
                color: 'var(--primary-blue)', 
                fontWeight: 'bold', 
                fontSize: '1.1rem', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                marginTop: '10px'
              }}
            >
              {isExpanded ? 'Ver Menos' : 'Ler mais sobre nossa jornada'} {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ position: 'relative' }}
          >
            <div style={{
              width: '100%',
              aspectRatio: '1/1',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-xl)',
              background: '#f1f5f9'
            }}>
              <AnimatePresence mode="wait">
                {banners.length > 0 ? (
                  <motion.img 
                    key={banners[currentBannerIndex]._id}
                    src={banners[currentBannerIndex].imageUrl} 
                    alt="Doca Mozambique" 
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.8 }}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <img 
                    src="/docasobrenoss.jpeg" 
                    alt="Equipa DOCA" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                )}
              </AnimatePresence>

              {/* Slider Dots */}
              {banners.length > 1 && (
                <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px', zIndex: 10 }}>
                  {banners.map((_, idx) => (
                    <div 
                      key={idx}
                      onClick={() => setCurrentBannerIndex(idx)}
                      style={{ 
                        width: idx === currentBannerIndex ? '20px' : '8px', 
                        height: '8px', 
                        borderRadius: '10px', 
                        background: idx === currentBannerIndex ? 'var(--accent-yellow)' : 'rgba(255,255,255,0.5)',
                        transition: 'all 0.3s',
                        cursor: 'pointer'
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
            {/* Stats Card Overlay */}
            <div style={{
              position: 'absolute',
              bottom: '30px',
              right: '-20px',
              backgroundColor: 'white',
              padding: '20px 30px',
              borderRadius: '15px',
              boxShadow: 'var(--shadow-lg)',
              borderLeft: '5px solid var(--accent-yellow)'
            }}>
              <div style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--primary-blue)' }}>15+</div>
              <div style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--text-muted)' }}>Anos de Experiência</div>
            </div>
          </motion.div>
        </div>

        {/* Stats Bar */}
        <div style={{
          background: 'linear-gradient(135deg, var(--primary-blue), #002244)',
          borderRadius: '20px',
          padding: '50px 40px',
          marginTop: '60px',
          display: 'flex',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          gap: '30px'
        }}>
          <CounterStat target={49}  label="Clientes Satisfeitos" icon={Users}          suffix="+" />
          <CounterStat target={178} label="Projetos Realizados"  icon={FolderKanban}   suffix="+" />
          <CounterStat target={6}   label="Prémios Recebidos"    icon={Trophy}         suffix="" />
        </div>
      </div>
    </section>
  );
};

export default About;
