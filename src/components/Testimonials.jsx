import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonialsData = [
  {
    id: 1,
    name: 'Albertina Mucavele',
    role: 'Empresária',
    text: 'Amei o serviço que fizeram na minha empresa. Serviço de qualidade. Super recomendo.',
    stars: 5,
    initials: 'AM'
  },
  {
    id: 2,
    name: 'Jorge Rodrigues',
    role: 'Director de Operações',
    text: 'A DOCA conseguiu reduzir e impedir falhas no desempenho dos ar condicionados com a manutenção preventiva. Um forte abraço à equipa — fizeram um bom trabalho e estou gostando muito dos serviços da empresa.',
    stars: 5,
    initials: 'JR'
  },
  {
    id: 3,
    name: 'Bernardo Ubisse',
    role: 'Proprietário',
    text: 'Estou muito impressionado com esta empresa, tem plantas para todos os gostos e bolsos. A partir do mesmo já consegui escolher a planta da minha futura casa.',
    stars: 5,
    initials: 'BU'
  }
];

const StarRating = ({ count }) => (
  <div style={{ display: 'flex', gap: '4px', marginBottom: '20px' }}>
    {Array.from({ length: count }).map((_, i) => (
      <Star key={i} size={18} fill="var(--accent-yellow)" color="var(--accent-yellow)" />
    ))}
  </div>
);

const Testimonials = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive(prev => (prev + 1) % testimonialsData.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setActive(i => (i - 1 + testimonialsData.length) % testimonialsData.length);
  const next = () => setActive(i => (i + 1) % testimonialsData.length);

  const testimonial = testimonialsData[active];

  return (
    <section
      id="testemunhos"
      style={{
        background: 'linear-gradient(135deg, #001A33 0%, #003366 100%)',
        color: 'white',
        padding: '80px 0'
      }}
    >
      <div className="container">
        {/* Section Title */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontSize: '2.5rem', fontFamily: 'Montserrat', marginBottom: '12px' }}
          >
            O que dizem os nossos <span style={{ color: 'var(--accent-yellow)' }}>Clientes</span>
          </motion.h2>
          <div style={{ width: '60px', height: '4px', background: 'var(--accent-yellow)', margin: '0 auto' }} />
        </div>

        {/* Cards row for desktop, slider for mobile  */}
        <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {testimonialsData.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              whileHover={{ y: -8 }}
              style={{
                backgroundColor: active === idx ? 'rgba(255,204,0,0.08)' : 'rgba(255,255,255,0.05)',
                border: active === idx ? '1px solid var(--accent-yellow)' : '1px solid rgba(255,255,255,0.1)',
                borderRadius: '20px',
                padding: '40px',
                flex: '1 1 280px',
                maxWidth: '380px',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onClick={() => setActive(idx)}
            >
              {/* Quote Icon */}
              <div style={{ color: 'var(--accent-yellow)', marginBottom: '20px' }}>
                <Quote size={32} />
              </div>

              <StarRating count={t.stars} />

              <p style={{ color: '#CBD5E1', fontSize: '1.05rem', lineHeight: '1.8', marginBottom: '30px', fontStyle: 'italic' }}>
                "{t.text}"
              </p>

              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--accent-yellow)',
                  color: 'var(--primary-blue)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '800',
                  fontSize: '1.1rem',
                  flexShrink: 0
                }}>
                  {t.initials}
                </div>
                <div>
                  <div style={{ fontWeight: '700', fontSize: '1.05rem' }}>{t.name}</div>
                  <div style={{ color: '#94A3B8', fontSize: '0.9rem' }}>{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Navigation dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '40px', alignItems: 'center' }}>
          <button onClick={prev} style={{ color: 'white', backgroundColor: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <ChevronLeft size={20} />
          </button>
          {testimonialsData.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                width: active === i ? '28px' : '10px',
                height: '10px',
                borderRadius: '5px',
                backgroundColor: active === i ? 'var(--accent-yellow)' : 'rgba(255,255,255,0.3)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            />
          ))}
          <button onClick={next} style={{ color: 'white', backgroundColor: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
