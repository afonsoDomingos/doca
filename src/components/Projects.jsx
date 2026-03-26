import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Plus } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_BASE_URL || (import.meta.env.DEV ? 'http://localhost:5000' : '');

const Projects = () => {
  const [filter, setFilter] = useState('Todas');
  const [projectsData, setProjectsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = ['Todas', 'Construção', 'Manutenção', 'Consultoria', 'Antes/Depois'];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${API_URL}/api/projects`);
        const data = await response.json();
        setProjectsData(data);
      } catch (err) {
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

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
                key={project._id}
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
                  src={project.imageUrl} 
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
