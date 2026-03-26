import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Users, FolderKanban, Trophy } from 'lucide-react';

const CounterStat = ({ target, label, icon: Icon, suffix = '+' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
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
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
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
              Sobre a <span style={{ color: 'var(--accent-yellow-dark)' }}>DOCA Construção</span>
            </h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
              A DOCA CONSTRUÇÃO E MANUTENÇÃO é uma empresa líder no mercado de construção civil, 
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
              height: '450px',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-lg)'
            }}>
              <img 
                src="/docasobrenoss.jpeg" 
                alt="Equipa DOCA" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
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
