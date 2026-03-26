import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  Settings, 
  LogOut, 
  Plus, 
  Edit, 
  Trash2, 
  Check, 
  X,
  ExternalLink,
  ChevronRight,
  User,
  Image as ImageIcon
} from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    imageUrl: '',
    isFeatured: false
  });
  
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem('adminAuthenticated');
    if (!auth) {
      navigate('/admin/login');
    }
    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [projectsRes, quotesRes] = await Promise.all([
        fetch('http://localhost:5000/api/projects'),
        fetch('http://localhost:5000/api/quotes')
      ]);
      const projectsData = await projectsRes.json();
      const quotesData = await quotesRes.json();
      setProjects(projectsData);
      setQuotes(quotesData);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    navigate('/admin/login');
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editingProject 
      ? `http://localhost:5000/api/projects/${editingProject._id}` 
      : 'http://localhost:5000/api/projects';
    const method = editingProject ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchData();
        closeModal();
      }
    } catch (err) {
      console.error('Error saving project:', err);
    }
  };

  const handleDeleteProject = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este projeto?')) {
      try {
        await fetch(`http://localhost:5000/api/projects/${id}`, {
          method: 'DELETE',
        });
        fetchData();
      } catch (err) {
        console.error('Error deleting project:', err);
      }
    }
  };

  const handleDeleteQuote = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este pedido?')) {
      try {
        await fetch(`http://localhost:5000/api/quotes/${id}`, {
          method: 'DELETE',
        });
        fetchData();
      } catch (err) {
        console.error('Error deleting quote:', err);
      }
    }
  };

  const openModal = (project = null) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        title: project.title,
        category: project.category,
        imageUrl: project.imageUrl,
        isFeatured: project.isFeatured
      });
    } else {
      setEditingProject(null);
      setFormData({
        title: '',
        category: '',
        imageUrl: '',
        isFeatured: false
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc' }}>
      {/* Sidebar */}
      <aside style={{ 
        width: '280px', 
        background: '#1e293b', 
        color: 'white', 
        padding: '2rem 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        height: '100vh',
        zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '3rem', padding: '0 0.5rem' }}>
          <div style={{ background: '#eb8923', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <LayoutDashboard size={20} color="white" />
          </div>
          <span style={{ fontSize: '1.25rem', fontWeight: '700', letterSpacing: '0.5px' }}>DOCA ADMIN</span>
        </div>

        <nav style={{ flex: 1 }}>
          <div style={{ marginBottom: '2rem' }}>
            <p style={{ color: '#64748b', fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem', padding: '0 0.5rem' }}>Menu Principal</p>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li 
                onClick={() => setActiveTab('projects')}
                style={{ 
                  background: activeTab === 'projects' ? 'rgba(235, 137, 35, 0.1)' : 'transparent', 
                  color: activeTab === 'projects' ? '#eb8923' : '#94a3b8', 
                  padding: '12px 16px', 
                  borderRadius: '12px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  transition: 'all 0.2s'
                }}>
                <Briefcase size={20} /> Projetos
              </li>
              <li 
                onClick={() => setActiveTab('quotes')}
                style={{ 
                  background: activeTab === 'quotes' ? 'rgba(235, 137, 35, 0.1)' : 'transparent', 
                  color: activeTab === 'quotes' ? '#eb8923' : '#94a3b8', 
                  padding: '12px 16px', 
                  borderRadius: '12px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  transition: 'all 0.2s'
                }}>
                <MessageCircle size={20} /> Pedidos de Orçamento
              </li>
              <li style={{ 
                color: '#94a3b8', 
                padding: '12px 16px', 
                borderRadius: '12px', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}>
                <Settings size={20} /> Configurações
              </li>
            </ul>
          </div>
        </nav>

        <div style={{ 
          marginTop: 'auto', 
          padding: '1rem', 
          background: 'rgba(255, 255, 255, 0.05)', 
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#334155', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <User size={20} color="#94a3b8" />
            </div>
            <div>
              <p style={{ fontSize: '0.875rem', fontWeight: '600', margin: 0 }}>Geral DOCA</p>
              <p style={{ fontSize: '0.75rem', color: '#64748b', margin: 0 }}>Administrador</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            style={{ 
              width: '100%', 
              padding: '10px', 
              background: 'transparent', 
              color: '#f87171', 
              border: '1px solid rgba(248, 113, 113, 0.2)', 
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: '600',
              transition: 'all 0.2s'
            }}
          >
            <LogOut size={16} /> Sair
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ marginLeft: '280px', flex: 1, padding: '2rem 3rem' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
              Páginas <ChevronRight size={14} /> <span style={{ color: '#1e293b', fontWeight: '500' }}>{activeTab === 'projects' ? 'Projetos' : 'Pedidos de Orçamento'}</span>
            </div>
            <h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#1e293b', margin: 0 }}>
              {activeTab === 'projects' ? 'Gerenciar Projetos' : 'Solicitações de Orçamento'}
            </h1>
          </div>
          
          {activeTab === 'projects' && (
            <button 
              onClick={() => openModal()}
              style={{ padding: '12px 24px', background: '#eb8923', color: 'white', border: 'none', borderRadius: '12px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
            >
              <Plus size={20} /> Novo Projeto
            </button>
          )}
        </header>

        {activeTab === 'projects' ? (
          /* Projects View */
          <div style={{ background: 'white', borderRadius: '24px', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #f1f5f9', background: '#f8fafc' }}>
                  <th style={{ padding: '1.25rem 2rem', color: '#64748b', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase' }}>Projeto</th>
                  <th style={{ padding: '1.25rem 2rem', color: '#64748b', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase' }}>Categoria</th>
                  <th style={{ padding: '1.25rem 2rem', color: '#64748b', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase' }}>Destaque</th>
                  <th style={{ padding: '1.25rem 2rem', color: '#64748b', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', textAlign: 'right' }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '1.25rem 2rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <img src={project.imageUrl} alt="" style={{ width: '48px', height: '48px', borderRadius: '12px', objectFit: 'cover' }} />
                        <span style={{ fontWeight: '600', color: '#1e293b' }}>{project.title}</span>
                      </div>
                    </td>
                    <td style={{ padding: '1.25rem 2rem' }}>{project.category}</td>
                    <td style={{ padding: '1.25rem 2rem' }}>{project.isFeatured ? 'Sim' : 'Não'}</td>
                    <td style={{ padding: '1.25rem 2rem', textAlign: 'right' }}>
                      <button onClick={() => openModal(project)} style={{ marginRight: '8px', background: 'none', border: '1px solid #e2e8f0', padding: '6px', borderRadius: '6px', cursor: 'pointer' }}><Edit size={16} color="#64748b" /></button>
                      <button onClick={() => handleDeleteProject(project._id)} style={{ background: 'none', border: '1px solid #fee2e2', padding: '6px', borderRadius: '6px', cursor: 'pointer' }}><Trash2 size={16} color="#ef4444" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          /* Quotes View */
          <div style={{ background: 'white', borderRadius: '24px', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #f1f5f9', background: '#f8fafc' }}>
                  <th style={{ padding: '1.25rem 2rem', color: '#64748b', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase' }}>Cliente</th>
                  <th style={{ padding: '1.25rem 2rem', color: '#64748b', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase' }}>Serviço / Orçamento</th>
                  <th style={{ padding: '1.25rem 2rem', color: '#64748b', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase' }}>Data</th>
                  <th style={{ padding: '1.25rem 2rem', color: '#64748b', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', textAlign: 'right' }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {quotes.map((quote) => (
                  <tr key={quote._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '1.25rem 2rem' }}>
                      <p style={{ fontWeight: '600', color: '#1e293b', margin: 0 }}>{quote.clientName}</p>
                      <p style={{ fontSize: '0.75rem', color: '#64748b', margin: 0 }}>{quote.email} | {quote.phone}</p>
                    </td>
                    <td style={{ padding: '1.25rem 2rem' }}>
                      <p style={{ fontWeight: '600', color: '#10b981', margin: 0 }}>{quote.serviceType}</p>
                      <p style={{ fontSize: '0.75rem', color: '#64748b', margin: 0 }}>{quote.budgetRange}</p>
                    </td>
                    <td style={{ padding: '1.25rem 2rem', fontSize: '0.875rem' }}>
                      {new Date(quote.createdAt).toLocaleDateString('pt-MZ')}
                    </td>
                    <td style={{ padding: '1.25rem 2rem', textAlign: 'right' }}>
                      <button 
                        onClick={() => alert(`Descrição: ${quote.description}`)}
                        style={{ marginRight: '8px', background: 'none', border: '1px solid #e2e8f0', padding: '6px', borderRadius: '6px', cursor: 'pointer' }}
                      >
                        <ExternalLink size={16} color="#3b82f6" />
                      </button>
                      <button onClick={() => handleDeleteQuote(quote._id)} style={{ background: 'none', border: '1px solid #fee2e2', padding: '6px', borderRadius: '6px', cursor: 'pointer' }}><Trash2 size={16} color="#ef4444" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* CRUD Modal */}
      {isModalOpen && (
        <div style={{ 
          position: 'fixed', 
          inset: 0, 
          background: 'rgba(15, 23, 42, 0.7)', 
          backdropFilter: 'blur(4px)',
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          zIndex: 100,
          padding: '2rem'
        }}>
          <div style={{ 
            background: 'white', 
            width: '100%', 
            maxWidth: '550px', 
            borderRadius: '24px', 
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            overflow: 'hidden'
          }}>
            <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1e293b', margin: 0 }}>
                {editingProject ? 'Editar Projeto' : 'Novo Projeto'}
              </h3>
              <button onClick={closeModal} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#94a3b8' }}>
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#475569', marginBottom: '0.5rem' }}>Título do Projeto</label>
                  <input 
                    type="text" 
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none' }}
                  />
                </div>
                
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#475569', marginBottom: '0.5rem' }}>Categoria</label>
                  <select 
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none', background: 'white' }}
                  >
                    <option value="">Selecione uma categoria</option>
                    <option value="Construção">Construção</option>
                    <option value="Manutenção">Manutenção</option>
                    <option value="Consultoria">Consultoria</option>
                    <option value="Antes/Depois">Antes/Depois</option>
                  </select>
                </div>
                
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#475569', marginBottom: '0.5rem' }}>URL da Imagem</label>
                  <input 
                    type="text" 
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleInputChange}
                    required
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none' }}
                  />
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input 
                    type="checkbox" 
                    id="isFeatured"
                    name="isFeatured"
                    checked={formData.isFeatured}
                    onChange={handleInputChange}
                    style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                  />
                  <label htmlFor="isFeatured" style={{ fontSize: '0.875rem', fontWeight: '600', color: '#475569', cursor: 'pointer' }}>
                    Mostrar em Destaque na Home
                  </label>
                </div>
              </div>
              
              <div style={{ marginTop: '2.5rem', display: 'flex', gap: '12px' }}>
                <button 
                  type="button" 
                  onClick={closeModal}
                  style={{ flex: 1, padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0', background: 'white', fontWeight: '600', color: '#64748b', cursor: 'pointer' }}
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  style={{ flex: 1, padding: '12px', borderRadius: '12px', border: 'none', background: '#eb8923', fontWeight: '600', color: 'white', cursor: 'pointer' }}
                >
                  {editingProject ? 'Salvar Alterações' : 'Criar Projeto'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
