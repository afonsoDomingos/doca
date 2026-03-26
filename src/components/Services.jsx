import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Settings, ShieldCheck, ClipboardCheck, LayoutGrid, Droplets } from 'lucide-react';

const ServiceCard = ({ icon: Icon, title, description, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    whileHover={{ y: -15, boxShadow: 'var(--shadow-lg)', borderTop: '4px solid var(--accent-yellow)' }}
    style={{
      backgroundColor: 'white',
      padding: '40px 30px',
      borderRadius: '16px',
      boxShadow: 'var(--shadow-sm)',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      transition: 'var(--transition-smooth)',
      borderTop: '4px solid transparent',
      flex: '1 1 300px'
    }}
  >
    <div style={{ backgroundColor: '#EEF2FF', width: '60px', height: '60px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-blue)' }}>
      <Icon size={32} />
    </div>
    <h3 style={{ fontSize: '1.5rem', color: 'var(--primary-blue)' }}>{title}</h3>
    <p style={{ color: 'var(--text-muted)', lineHeight: '1.7' }}>{description}</p>
    <a href="#" style={{ fontWeight: '600', color: 'var(--primary-blue-light)', display: 'flex', alignItems: 'center', gap: '5px' }}>
      Saber mais <LayoutGrid size={16} />
    </a>
  </motion.div>
);

const Services = () => {
  const servicesData = [
    {
      icon: Building2,
      title: "Construção Civil",
      description: "Projetos de engenharia de ponta com prazos garantidos e segurança rigorosa em todos os canteiros de obra."
    },
    {
      icon: Settings,
      title: "Manutenção",
      description: "Serviços preventivos e corretivos com atendimento 24/7 para garantir que suas instalações funcionem perfeitamente."
    },
    {
      icon: ClipboardCheck,
      title: "Consultoria Técnica",
      description: "Apoio estratégico em planeamento, orçamentação e análise técnica de viabilidade para empreendimentos."
    },
    {
      icon: Droplets,
      title: "Limpeza Industrial",
      description: "Eficiência e conformidade ambiental em serviços de limpeza profunda e higienização para grandes instalações."
    },
    {
      icon: ShieldCheck,
      title: "Gestão de Projetos",
      description: "Acompanhamento integral desde a concepção até a entrega, com relatórios detalhados e gestão de riscos eficiente."
    }
  ];

  return (
    <section id="servicos">
      <div className="container">
        <div className="section-title">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2>Nossos <span style={{ color: 'var(--accent-yellow-dark)' }}>Serviços</span> Específicos</h2>
            <div className="underline"></div>
            <p style={{ marginTop: '20px', color: 'var(--text-muted)', maxWidth: '700px', margin: '20px auto 0' }}>
              Fornecemos soluções completas no setor da construção, aliando tradição com métodos contemporâneos de gestão.
            </p>
          </motion.div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
          {servicesData.map((service, index) => (
            <ServiceCard 
              key={index} 
              {...service} 
              delay={index * 0.15}
            />
          ))}
          
          {/* Add a placeholder for more/future services */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{
              border: '2px dashed #ddd',
              padding: '40px',
              borderRadius: '16px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <div style={{ width: '50px', height: '50px', border: '2px solid #ddd', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999', marginBottom: '15px' }}>
              +
            </div>
            <p style={{ color: '#999', fontWeight: '600' }}>Em breve novos serviços</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Services;
