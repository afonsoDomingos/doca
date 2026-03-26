import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Plus } from 'lucide-react';

const Projects = () => {
  const [filter, setFilter] = useState('Todas');

  const categories = ['Todas', 'Construção', 'Manutenção', 'Consultoria', 'Antes/Depois'];

  const projectsData = [
    { id: 1, title: 'Residencial MiraMar', category: 'Construção', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop' },
    { id: 2, title: 'Sede Bancária Maputo', category: 'Manutenção', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop' },
    { id: 3, title: 'Reforma Comercial', category: 'Antes/Depois', image: '/project_before_after_1774479019694.png' },
    { id: 4, title: 'Edifício Infinity', category: 'Construção', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop' },
    { id: 5, title: 'Plano Diretor Industrial', category: 'Consultoria', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop' },
    { id: 6, title: 'Manutenção Galeria Central', category: 'Manutenção', image: 'https://images.unsplash.com/photo-1590725121839-892b458a74fe?w=800&auto=format&fit=crop' }
  ];

  const filteredProjects = filter === 'Todas' 
    ? projectsData 
    : projectsData.filter(p => p.category === filter);

  return (
    <section id="projetos" style={{ backgroundColor: '#F3F4F6' }}>
      <div className="container">
        <div className="section-title">
          <h2>Nosso <span style={{ color: 'var(--accent-yellow-dark)' }}>Portfólio</span> de Projetos</h2>
          <div className="underline"></div>
        </div>

        {/* Filter Buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '15px', marginBottom: '50px' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              style={{
                padding: '10px 25px',
                borderRadius: '50px',
                backgroundColor: filter === cat ? 'var(--primary-blue)' : 'white',
                color: filter === cat ? 'white' : 'var(--primary-blue)',
                fontWeight: '600',
                boxShadow: filter === cat ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
                transition: 'var(--transition-smooth)'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid Container */}
        <motion.div 
          layout
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
            gap: '30px' 
          }}
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -10 }}
                style={{
                  position: 'relative',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  height: '350px',
                  boxShadow: 'var(--shadow-lg)',
                  cursor: 'pointer'
                }}
              >
                <img 
                  src={project.image} 
                  alt={project.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                
                {/* Overlay Content */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(rgba(0, 51, 102, 0.9), rgba(255, 204, 0, 0.4))',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '30px',
                    color: 'white',
                    textAlign: 'center'
                  }}
                >
                  <span style={{ backgroundColor: 'var(--accent-yellow)', color: 'var(--primary-blue)', padding: '5px 15px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '15px' }}>
                    {project.category}
                  </span>
                  <h3 style={{ fontSize: '1.6rem', marginBottom: '15px' }}>{project.title}</h3>
                  <div style={{ display: 'flex', gap: '15px' }}>
                    <button style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: '12px', borderRadius: '50%', color: 'white' }}>
                      <Plus size={20} />
                    </button>
                    <button style={{ backgroundColor: 'white', padding: '12px', borderRadius: '50%', color: 'var(--primary-blue)' }}>
                      <ExternalLink size={20} />
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Load More Trigger Area */}
        <div style={{ marginTop: '60px', textAlign: 'center' }}>
          <button className="btn btn-outline" style={{ color: 'var(--primary-blue)', borderColor: 'var(--primary-blue)', padding: '15px 40px' }}>
            Explorar Todos os Projetos (+120)
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
