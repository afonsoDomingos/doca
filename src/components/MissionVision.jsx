import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Target, Sparkles, CheckCircle2 } from 'lucide-react';

const Card = ({ title, text, icon: Icon, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    style={{
      backgroundColor: 'white',
      padding: '40px',
      borderRadius: '20px',
      boxShadow: 'var(--shadow-lg)',
      borderTop: `6px solid ${color}`,
      flex: 1,
      minWidth: '300px'
    }}
  >
    <div style={{
      backgroundColor: `${color}15`,
      color: color,
      width: '70px',
      height: '70px',
      borderRadius: '15px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '25px'
    }}>
      <Icon size={35} />
    </div>
    <h3 style={{ fontSize: '1.8rem', color: 'var(--primary-blue)', marginBottom: '15px' }}>{title}</h3>
    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.7' }}>{text}</p>
  </motion.div>
);

const MissionVision = () => {
  const values = [
    "Honestidade", "Compromisso", "Confiança", 
    "Problem-solving", "Inovação", "Qualidade", "Segurança"
  ];

  return (
    <section id="mvv" style={{ background: 'linear-gradient(135deg, #001A33 0%, #003366 100%)', color: 'white', overflow: 'hidden' }}>
      <div className="container">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', marginBottom: '80px' }}>
          <Card 
            title="Missão" 
            icon={Target} 
            color="#FFCC00" 
            delay={0}
            text="Prover excelência em soluções de engenharia e construção civil, superando expectativas através de gestão eficiente e segurança incondicional."
          />
          <Card 
            title="Visão" 
            icon={Eye} 
            color="#3B82F6" 
            delay={0.2}
            text="Ser a empresa de referência em Moçambique e além, reconhecida pela integridade, inovação técnica e impacto positivo nas comunidades onde operamos."
          />
        </div>

        <div style={{ textAlign: 'center' }}>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontSize: '2.5rem', marginBottom: '50px' }}
          >
            Nossos <span style={{ color: 'var(--accent-yellow)' }}>Valores</span> Fundamentais
          </motion.h2>

          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            justifyContent: 'center', 
            gap: '15px',
            maxWidth: '1000px',
            margin: '0 auto'
          }}>
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 204, 0, 0.2)' }}
                style={{
                  padding: '12px 25px',
                  borderRadius: '50px',
                  border: '1px solid var(--accent-yellow)',
                  color: 'var(--accent-yellow)',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                <CheckCircle2 size={18} /> {value}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
