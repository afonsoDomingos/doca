import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

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
                src="https://images.unsplash.com/photo-1541913057-259c1ec391f4?fm=jpg&q=80&w=1000&ixlib=rb-4.0.3" 
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
      </div>
    </section>
  );
};

export default About;
