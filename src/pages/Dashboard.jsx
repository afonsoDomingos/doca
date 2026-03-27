import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
  MessageCircle,
  Search,
  TrendingUp,
  Clock,
  CheckCircle2,
  Users,
  Image as ImageIcon,
  Save,
  Camera,
  ShieldCheck
} from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import ModernAlert from '../components/ModernAlert';

const API_URL = import.meta.env.VITE_API_BASE_URL || (import.meta.env.DEV ? 'http://localhost:5000' : '');

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [projects, setProjects] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [users, setUsers] = useState([]);
  const [banners, setBanners] = useState([]);
  const [settings, setSettings] = useState({
    supportWhatsapp: '',
    supportEmail: '',
    address: 'Maputo, Moçambique',
    companyName: 'DOCA MOZAMBIQUE'
  });
  const [loading, setLoading] = useState(true);
  const [loadingImage, setLoadingImage] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [manageTab, setManageTab] = useState('general');
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    imageUrl: '',
    isFeatured: false
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState({
    totalProjects: 0,
    pendingQuotes: 0,
    totalUsers: 0
  });

  const [alertConfig, setAlertConfig] = useState({ 
    isOpen: false, 
    type: 'info', 
    title: '', 
    message: '', 
    onConfirm: null 
  });

  const showAlert = (title, message, type = 'info', onConfirm = null) => {
    setAlertConfig({ isOpen: true, title, message, type, onConfirm });
  };
  
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem('adminAuthenticated');
    if (!auth) {
      navigate('/portal/login');
    }
    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [projectsRes, quotesRes, usersRes, bannersRes, settingsRes] = await Promise.all([
        fetch(`${API_URL}/api/projects`),
        fetch(`${API_URL}/api/quotes`),
        fetch(`${API_URL}/api/users`),
        fetch(`${API_URL}/api/banners?type=about`),
        fetch(`${API_URL}/api/settings`)
      ]);
      const projectsData = await projectsRes.json();
      const quotesData = await quotesRes.json();
      const usersData = await usersRes.json();
      const bannersData = await bannersRes.json();
      const settingsData = await settingsRes.json();
      setProjects(projectsData);
      setQuotes(quotesData);
      setUsers(usersData);
      setBanners(bannersData);
      if (Object.keys(settingsData).length > 0) {
        setSettings(prev => ({ ...prev, ...settingsData }));
      }
      
      // Calculate Stats
      setStats({
        totalProjects: projectsData.length,
        pendingQuotes: quotesData.filter(q => q.status === 'Pendente' || q.status === 'Em Análise').length,
        totalUsers: usersData.length
      });
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    navigate('/portal/login');
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
      ? `${API_URL}/api/projects/${editingProject._id}` 
      : `${API_URL}/api/projects`;
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
    showAlert(
      'Confirmar Exclusão', 
      'Tem certeza que deseja excluir este projeto permanentemente?', 
      'confirm',
      async () => {
        try {
          await fetch(`${API_URL}/api/projects/${id}`, {
            method: 'DELETE',
          });
          fetchData();
          showAlert('Sucesso', 'Projeto removido com sucesso!', 'success');
        } catch (err) {
          console.error('Error deleting project:', err);
          showAlert('Erro', 'Não foi possível excluir o projeto.', 'error');
        }
      }
    );
  };

  const handleDeleteQuote = async (id) => {
    showAlert(
      'Confirmar remoção', 
      'Tem certeza que deseja excluir este pedido de orçamento?', 
      'confirm',
      async () => {
        try {
          await fetch(`${API_URL}/api/quotes/${id}`, {
            method: 'DELETE',
          });
          fetchData();
          showAlert('Sucesso', 'Pedido removido.', 'success');
        } catch (err) {
          console.error('Error deleting quote:', err);
          showAlert('Erro', 'Não foi possível excluir o pedido.', 'error');
        }
      }
    );
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

  const handleAddBanner = async (imageUrl) => {
    try {
      await fetch(`${API_URL}/api/banners`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl, type: 'about' })
      });
      fetchData();
      showAlert('Sucesso', 'Criativo adicionado com sucesso à seção Sobre!', 'success');
    } catch (err) {
      console.error('Error adding banner:', err);
      showAlert('Erro', 'Falha ao salvar criativo.', 'error');
    }
  };

  const handleDeleteBanner = async (id) => {
    showAlert('Confirmar Exclusão', 'Eliminar este criativo da seção Sobre?', 'confirm', async () => {
      try {
        await fetch(`${API_URL}/api/banners/${id}`, { method: 'DELETE' });
        fetchData();
        showAlert('Sucesso', 'Removido.', 'success');
      } catch (err) {
        console.error('Error deleting banner:', err);
      }
    });
  };

  const handleUpdateSettings = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/settings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      if (res.ok) {
        showAlert('Sucesso', 'Configurações atualizadas com sucesso!', 'success');
      }
    } catch (err) {
      showAlert('Erro', 'Falha ao salvar configurações', 'error');
    }
  };

  const handleDeleteUser = async (userId, name) => {
    showAlert(
      'Remover Usuário',
      `Tens a certeza que desejas excluir permanentemente a conta de ${name}? Esta ação não pode ser desfeita.`,
      'confirm',
      async () => {
        try {
          const response = await fetch(`${API_URL}/api/users/${userId}`, {
            method: 'DELETE'
          });
          if (response.ok) {
            showAlert('Sucesso', 'Usuário removido com sucesso.', 'success');
            fetchData();
          } else {
             showAlert('Erro', 'Não foi possível remover o usuário.', 'error');
          }
        } catch (err) {
          console.error('Error deleting user:', err);
        }
      }
    );
  };

  const handlePromote = async (userId, name) => {
    showAlert(
      'Promover Usuário',
      `Tens a certeza que desejas promover ${name} a Administrador? Ele terá acesso total ao painel.`,
      'confirm',
      async () => {
        try {
          const response = await fetch(`${API_URL}/api/users/promote`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId })
          });
          if (response.ok) {
            showAlert('Sucesso', `${name} agora é um Administrador!`, 'success');
            fetchData();
          } else {
            const data = await response.json();
            showAlert('Erro', data.error || 'Erro ao promover usuário', 'error');
          }
        } catch (err) {
          console.error('Error promoting user:', err);
          showAlert('Erro de Conexão', 'Não foi possível contactar o servidor.', 'error');
        }
      }
    );
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
  };

  const openManageModal = (quote) => {
    setSelectedQuote(quote);
    setIsManageModalOpen(true);
    setManageTab('general');
  };

  const closeManageModal = () => {
    setIsManageModalOpen(false);
    setSelectedQuote(null);
  };

  const handleUpdateQuote = async (updatedData) => {
    try {
      const response = await fetch(`${API_URL}/api/quotes/${selectedQuote._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });
      if (response.ok) {
        fetchData();
        const freshData = await response.json();
        setSelectedQuote(freshData);
      }
    } catch (err) {
      console.error('Error updating quote:', err);
    }
  };

  const getStatusData = () => {
    const counts = { Pendente: 0, 'Em Análise': 0, 'Em Execução': 0, Finalização: 0, Concluído: 0, Cancelado: 0 };
    quotes.forEach(q => { if (counts[q.status] !== undefined) counts[q.status]++; });
    return Object.keys(counts).filter(k => counts[k] > 0).map(k => ({ name: k, value: counts[k] }));
  };

  const getServiceData = () => {
    const counts = {};
    quotes.forEach(q => { counts[q.serviceType] = (counts[q.serviceType] || 0) + 1; });
    return Object.keys(counts).map(k => ({ name: k, valor: counts[k] })).sort((a,b) => b.valor - a.valor).slice(0, 5);
  };

  const COLORS = ['#FFCC00', '#3b82f6', '#8b5cf6', '#f59e0b', '#10b981', '#ef4444'];

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredQuotes = quotes.filter(q => 
    q.clientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    q.serviceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f1f5f9', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Sidebar */}
      <aside style={{ 
        width: '280px', 
        background: '#000000', 
        color: 'white', 
        padding: '2rem 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        height: '100vh',
        zIndex: 10,
        overflowY: 'auto'
      }}>
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '3rem', padding: '0 0.5rem' }}>
          <div style={{ background: '#FFCC00', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <LayoutDashboard size={20} color="white" />
          </div>
          <span style={{ fontSize: '1.25rem', fontWeight: '700', letterSpacing: '0.5px', color: 'white' }}>DOCA ADMIN</span>
        </Link>

        <nav style={{ flex: 1 }}>
          <div style={{ marginBottom: '2rem' }}>
            <p style={{ color: '#64748b', fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem', padding: '0 0.5rem' }}>Menu Principal</p>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li 
                onClick={() => setActiveTab('overview')}
                style={{ 
                  background: activeTab === 'overview' ? 'rgba(235, 137, 35, 0.1)' : 'transparent', 
                  color: activeTab === 'overview' ? '#FFCC00' : '#94a3b8', 
                  padding: '12px 16px', 
                  borderRadius: '12px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  transition: 'all 0.2s'
                }}>
                <LayoutDashboard size={20} /> Visão Geral
              </li>
              <li 
                onClick={() => setActiveTab('projects')}
                style={{ 
                  background: activeTab === 'projects' ? 'rgba(235, 137, 35, 0.1)' : 'transparent', 
                  color: activeTab === 'projects' ? '#FFCC00' : '#94a3b8', 
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
                  color: activeTab === 'quotes' ? '#FFCC00' : '#94a3b8', 
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
              <li 
                onClick={() => setActiveTab('users')}
                style={{ 
                  background: activeTab === 'users' ? 'rgba(235, 137, 35, 0.1)' : 'transparent', 
                  color: activeTab === 'users' ? '#FFCC00' : '#94a3b8', 
                  padding: '12px 16px', 
                  borderRadius: '12px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  transition: 'all 0.2s'
                }}>
                <User size={20} /> Gestão de Usuários
              </li>
              <li 
                onClick={() => setActiveTab('banners')}
                style={{ 
                  background: activeTab === 'banners' ? 'rgba(235, 137, 35, 0.1)' : 'transparent', 
                  color: activeTab === 'banners' ? '#FFCC00' : '#94a3b8', 
                  padding: '12px 16px', 
                  borderRadius: '12px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  transition: 'all 0.2s'
                }}>
                <ImageIcon size={20} /> Conteúdo Institucional
              </li>
              <li 
                onClick={() => setActiveTab('settings')}
                style={{ 
                  background: activeTab === 'settings' ? 'rgba(235, 137, 35, 0.1)' : 'transparent', 
                  color: activeTab === 'settings' ? '#FFCC00' : '#94a3b8', 
                  padding: '12px 16px', 
                  borderRadius: '12px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  transition: 'all 0.2s'
                }}>
                <Settings size={20} /> Configurações
              </li>
              <li 
                onClick={() => navigate('/')}
                style={{ 
                color: '#94a3b8', 
                padding: '12px 16px', 
                borderRadius: '12px', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                marginTop: '10px',
                border: '1px solid rgba(255,255,255,0.05)'
              }}>
                <ExternalLink size={20} /> Ver Site Oficial
              </li>
            </ul>
          </div>
        </nav>

        <div style={{ 
          marginTop: 'auto', 
          padding: '1.25rem', 
          background: 'rgba(255, 255, 255, 0.05)', 
          borderRadius: '20px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          marginBottom: '2rem'
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

      {activeTab === 'users' && (
        <div style={{ marginLeft: '280px', flex: 1, padding: '2rem 3rem' }}>
          <header style={{ marginBottom: '3rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                  Páginas <ChevronRight size={14} /> <span style={{ color: '#FFCC00', fontWeight: '600' }}>Gestão de Usuários</span>
                </div>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#1e293b', margin: 0, letterSpacing: '-1px' }}>
                  Base de Clientes
                </h1>
              </div>
              
              <div style={{ position: 'relative' }}>
                <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input 
                  type="text" 
                  placeholder="Pesquisar por nome ou email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ 
                    padding: '12px 16px 12px 48px', 
                    borderRadius: '16px', 
                    border: '1px solid #e2e8f0', 
                    background: 'white',
                    width: '320px',
                    outline: 'none',
                    fontSize: '0.9rem',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                  }}
                />
              </div>
            </div>

            {/* Micro Stats for Users */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
              <div style={{ background: 'white', padding: '1.5rem', borderRadius: '24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ background: 'rgba(235, 137, 35, 0.1)', color: '#FFCC00', padding: '15px', borderRadius: '18px' }}>
                  <Users size={24} />
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: '600', color: '#64748b' }}>Total de Clientes</p>
                  <h4 style={{ margin: '4px 0 0', fontSize: '1.5rem', fontWeight: '800', color: '#1e293b' }}>{users.length}</h4>
                </div>
              </div>
            </div>
          </header>

          <div style={{ background: 'white', borderRadius: '28px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)', border: '1px solid rgba(226, 232, 240, 0.5)', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#f8fafc' }}>
                  <th style={{ padding: '1.5rem 2.5rem', color: '#475569', fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>Usuário</th>
                  <th style={{ padding: '1.5rem 2.5rem', color: '#475569', fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>Contato</th>
                  <th style={{ padding: '1.5rem 2.5rem', color: '#475569', fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', textAlign: 'center' }}>Operações</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(user => (
                  <tr key={user._id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'all 0.2s' }} className="table-row-hover">
                    <td style={{ padding: '1.5rem 2.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ width: '52px', height: '52px', borderRadius: '16px', background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#334155', border: '1px solid #e2e8f0' }}>
                          <User size={22} />
                        </div>
                        <div>
                          <p style={{ fontWeight: '700', color: '#1e293b', margin: 0, fontSize: '1rem' }}>{user.name}</p>
                          <p style={{ margin: 0, fontSize: '0.75rem', color: '#94a3b8' }}>ID: {user._id.slice(-6).toUpperCase()}</p>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '1.5rem 2.5rem' }}>
                      <p style={{ fontWeight: '600', color: '#475569', margin: 0, fontSize: '0.9rem' }}>{user.email}</p>
                      <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>{user.phone || 'Sem telefone'}</p>
                    </td>
                    <td style={{ padding: '1.5rem 2.5rem', textAlign: 'center' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        <button 
                          onClick={() => handlePromote(user._id, user.name)}
                          style={{ 
                            background: 'rgba(235, 137, 35, 0.1)', 
                            color: '#FFCC00', 
                            border: '1px solid rgba(235, 137, 35, 0.2)', 
                            padding: '10px 20px', 
                            borderRadius: '14px', 
                            fontSize: '0.875rem', 
                            fontWeight: '700', 
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                          }}
                        >
                          <ShieldCheck size={16} /> Promover
                        </button>
                        <button 
                          onClick={() => handleDeleteUser(user._id, user.name)}
                          style={{ 
                            background: 'rgba(239, 68, 68, 0.1)', 
                            color: '#ef4444', 
                            border: '1px solid rgba(239, 68, 68, 0.2)', 
                            padding: '10px', 
                            borderRadius: '14px', 
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                          title="Excluir Usuário"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main style={{ marginLeft: '280px', flex: 1, padding: '2rem 3rem' }}>
        
        {/* TAB: OVERVIEW */}
        {activeTab === 'overview' && (
          <div>
            <header style={{ marginBottom: '3rem' }}>
              <div style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Bem-vindo de volta, Admin</div>
              <h1 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#1e293b', margin: 0, letterSpacing: '-1px' }}>
                Visão Geral do Negócio
              </h1>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
              <div style={{ background: 'white', padding: '1.5rem', borderRadius: '24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid white' }}>
                <div style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', width: '45px', height: '45px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                  <Briefcase size={22} />
                </div>
                <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: '600', color: '#64748b' }}>Projetos no Portfolio</p>
                <h4 style={{ margin: '4px 0 0', fontSize: '2rem', fontWeight: '900', color: '#1e293b' }}>{stats.totalProjects}</h4>
              </div>

              <div style={{ background: 'white', padding: '1.5rem', borderRadius: '24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid white' }}>
                <div style={{ background: 'rgba(235, 137, 35, 0.1)', color: '#FFCC00', width: '45px', height: '45px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                  <Clock size={22} />
                </div>
                <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: '600', color: '#64748b' }}>Orçamentos Pendentes</p>
                <h4 style={{ margin: '4px 0 0', fontSize: '2rem', fontWeight: '900', color: '#1e293b' }}>{stats.pendingQuotes}</h4>
              </div>

              <div style={{ background: 'white', padding: '1.5rem', borderRadius: '24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid white' }}>
                <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', width: '45px', height: '45px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                  <Users size={22} />
                </div>
                <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: '600', color: '#64748b' }}>Total de Clientes</p>
                <h4 style={{ margin: '4px 0 0', fontSize: '2rem', fontWeight: '900', color: '#1e293b' }}>{stats.totalUsers}</h4>
              </div>
            </div>

            {/* CHARTS GRID */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
              <div style={{ background: 'white', padding: '2rem', borderRadius: '32px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid white' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#1e293b', marginBottom: '1.5rem' }}>Distribuição de Pedidos por Estado</h3>
                <div style={{ height: '300px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={getStatusData()}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {getStatusData().map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <RechartsTooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div style={{ background: 'white', padding: '2rem', borderRadius: '32px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid white' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#1e293b', marginBottom: '1.5rem' }}>Serviços Mais Solicitados</h3>
                <div style={{ height: '300px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={getServiceData()}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                      <YAxis allowDecimals={false} />
                      <RechartsTooltip cursor={{ fill: 'rgba(255,204,0,0.1)' }} />
                      <Bar dataKey="valor" fill="#1e293b" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div style={{ background: 'white', padding: '2rem', borderRadius: '32px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.05)', border: '1px solid white' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#1e293b' }}>Atividade Recente</h3>
                <button 
                  onClick={() => setActiveTab('quotes')}
                  style={{ background: 'none', border: 'none', color: '#FFCC00', fontWeight: '700', fontSize: '0.875rem', cursor: 'pointer' }}
                >
                  Ver todos os orçamentos →
                </button>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {quotes.slice(0, 3).map((q, idx) => (
                  <div key={idx} style={{ padding: '1.25rem', background: '#f8fafc', borderRadius: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                      <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: q.status === 'Pendente' ? '#FFCC00' : '#10b981' }} />
                      <div>
                        <p style={{ margin: 0, fontWeight: '700', color: '#1e293b', fontSize: '0.95rem' }}>{q.clientName}</p>
                        <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>Solicitou: {q.serviceType}</p>
                      </div>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '600' }}>{new Date(q.createdAt).toLocaleDateString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div>
            {/* Users list content (already defined above) */}
          </div>
        )}

        {/* TAB: PROJECTS */}
        {activeTab === 'projects' && (
          <div>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                  Páginas <ChevronRight size={14} /> <span style={{ color: '#FFCC00', fontWeight: '600' }}>Portfolio</span>
                </div>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#1e293b', margin: 0, letterSpacing: '-1px' }}>
                  Gerenciar Projetos
                </h1>
              </div>
              
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                 <div style={{ position: 'relative' }}>
                  <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                  <input 
                    type="text" 
                    placeholder="Pesquisar projeto..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ padding: '12px 16px 12px 48px', borderRadius: '16px', border: '1px solid #e2e8f0', background: 'white', outline: 'none', width: '250px' }}
                  />
                </div>
                <button 
                  onClick={() => openModal()}
                  style={{ background: 'linear-gradient(135deg, #FFCC00 0%, #d87a1d 100%)', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '16px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 6px -1px rgba(235, 137, 35, 0.4)', cursor: 'pointer' }}
                >
                  <Plus size={20} /> Novo Projeto
                </button>
              </div>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
              {filteredProjects.map((project) => (
                <div key={project._id} style={{ background: 'white', borderRadius: '28px', overflow: 'hidden', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)', border: '1px solid white', transition: 'transform 0.2s' }}>
                  <div style={{ position: 'relative', height: '200px' }}>
                    <img src={project.imageUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', top: '15px', right: '15px', background: 'rgba(255, 255, 255, 0.9)', padding: '6px 12px', borderRadius: '100px', fontSize: '0.7rem', fontWeight: '800', color: '#FFCC00', textTransform: 'uppercase' }}>
                      {project.category}
                    </div>
                  </div>
                  <div style={{ padding: '1.5rem' }}>
                    <h4 style={{ margin: '0 0 1rem 0', fontSize: '1.25rem', fontWeight: '800', color: '#1e293b' }}>{project.title}</h4>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.8rem', color: project.isFeatured ? '#10b981' : '#94a3b8', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        {project.isFeatured ? <CheckCircle2 size={14} /> : null} {project.isFeatured ? 'Em Destaque' : 'Normal'}
                      </span>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button onClick={() => openModal(project)} style={{ background: '#f1f5f9', border: 'none', padding: '8px', borderRadius: '10px', cursor: 'pointer', color: '#475569' }}><Edit size={16} /></button>
                        <button onClick={() => handleDeleteProject(project._id)} style={{ background: '#fef2f2', border: 'none', padding: '8px', borderRadius: '10px', cursor: 'pointer', color: '#ef4444' }}><Trash2 size={16} /></button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: QUOTES */}
        {activeTab === 'quotes' && (
          <div>
            <header style={{ marginBottom: '3rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                    Páginas <ChevronRight size={14} /> <span style={{ color: '#FFCC00', fontWeight: '600' }}>Orçamentos</span>
                  </div>
                  <h1 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#1e293b', margin: 0, letterSpacing: '-1px' }}>
                    Solicitações de Clientes
                  </h1>
                </div>
                
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ position: 'relative' }}>
                    <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                    <input 
                      type="text" 
                      placeholder="Filtrar por nome, serviço ou status..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      style={{ padding: '12px 16px 12px 48px', borderRadius: '16px', border: '1px solid #e2e8f0', background: 'white', outline: 'none', width: '300px' }}
                    />
                  </div>
                </div>
              </div>
            </header>

            <div style={{ background: 'white', borderRadius: '32px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.05)', border: '1px solid white', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: '#f8fafc' }}>
                    <th style={{ padding: '1.5rem 2.5rem', color: '#475569', fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase' }}>Cliente / Contato</th>
                    <th style={{ padding: '1.5rem 2.5rem', color: '#475569', fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase' }}>Serviço Interessado</th>
                    <th style={{ padding: '1.5rem 2.5rem', color: '#475569', fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase' }}>Status Atual</th>
                    <th style={{ padding: '1.5rem 2.5rem', color: '#475569', fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', textAlign: 'right' }}>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredQuotes.map((quote) => (
                    <tr key={quote._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '1.5rem 2.5rem' }}>
                        <p style={{ fontWeight: '700', color: '#1e293b', margin: 0, fontSize: '1rem' }}>{quote.clientName}</p>
                        <p style={{ fontSize: '0.8rem', color: '#64748b', margin: 0 }}>{quote.email} • {quote.phone}</p>
                      </td>
                      <td style={{ padding: '1.5rem 2.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ padding: '6px 14px', borderRadius: '100px', background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', fontSize: '0.75rem', fontWeight: '800' }}>
                            {quote.serviceType}
                          </span>
                        </div>
                        <p style={{ margin: '8px 0 0 0', fontSize: '0.8rem', color: '#94a3b8' }}>Orçamento: {quote.budgetRange}</p>
                      </td>
                      <td style={{ padding: '1.5rem 2.5rem' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 14px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: '800', background: quote.status === 'Pendente' ? '#fff7ed' : '#f0fdf4', color: quote.status === 'Pendente' ? '#ea580c' : '#16a34a' }}>
                          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: quote.status === 'Pendente' ? '#f97316' : '#22c55e' }} />
                          {quote.status}
                        </div>
                      </td>
                      <td style={{ padding: '1.5rem 2.5rem', textAlign: 'right' }}>
                        <button 
                          onClick={() => openManageModal(quote)}
                          style={{ background: '#1e293b', color: 'white', border: 'none', padding: '10px 16px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: '700', cursor: 'pointer', marginRight: '10px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                        >
                          <Settings size={14} /> GESTÃO
                        </button>
                        <button onClick={() => handleDeleteQuote(quote._id)} style={{ background: '#fef2f2', border: 'none', padding: '10px', borderRadius: '12px', cursor: 'pointer' }}>
                          <Trash2 size={18} color="#ef4444" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB: BANNERS */}
        {activeTab === 'banners' && (
          <div>
            <header style={{ marginBottom: '3rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                Páginas <ChevronRight size={14} /> <span style={{ color: '#FFCC00', fontWeight: '600' }}>Conteúdo Institucional</span>
              </div>
              <h1 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#1e293b', margin: 0, letterSpacing: '-1px' }}>
                Criativos da Seção "Sobre"
              </h1>
              <p style={{ color: '#64748b', marginTop: '1rem' }}>Gerencie as imagens que aparecem na apresentação da empresa. Garante que sejam quadradas (1:1).</p>
            </header>

            <div style={{ background: 'white', padding: '2rem', borderRadius: '32px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h3 style={{ margin: 0 }}>Imagens Atuais</h3>
                <label style={{ 
                  background: 'linear-gradient(135deg, #FFCC00 0%, #d87a1d 100%)', 
                  color: 'white', 
                  padding: '12px 24px', 
                  borderRadius: '16px', 
                  fontWeight: '800', 
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <Plus size={20} /> {loadingImage ? 'Processando...' : 'Adicionar Criativo (1:1)'}
                  <input 
                    type="file" 
                    accept="image/*" 
                    style={{ display: 'none' }} 
                    disabled={loadingImage}
                    onChange={async (e) => {
                      const file = e.target.files[0];
                      if (!file) return;
                      setLoadingImage(true);
                      const reader = new FileReader();
                      reader.readAsDataURL(file);
                      reader.onloadend = async () => {
                        try {
                          const res = await fetch(`${API_URL}/api/upload`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ data: reader.result })
                          });
                          const data = await res.json();
                          await handleAddBanner(data.url);
                        } catch (err) {
                           showAlert('Erro', 'Falha no upload', 'error');
                        } finally {
                          setLoadingImage(false);
                        }
                      };
                    }}
                  />
                </label>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.5rem' }}>
                {banners.map(b => (
                  <div key={b._id} style={{ position: 'relative', aspectRatio: '1/1', borderRadius: '20px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                    <img src={b.imageUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <button 
                      onClick={() => handleDeleteBanner(b._id)}
                      style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '10px', padding: '8px', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                    >
                      <Trash2 size={16} color="#ef4444" />
                    </button>
                  </div>
                ))}
                {banners.length === 0 && (
                  <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem', color: '#94a3b8', border: '2px dashed #e2e8f0', borderRadius: '24px' }}>
                    Nenhuma imagem personalizada adicionada. O sistema usará a imagem padrão.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB: SETTINGS */}
        {activeTab === 'settings' && (
          <div>
            <header style={{ marginBottom: '3rem' }}>
              <div style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Administração <ChevronRight size={14} /> <span style={{ color: '#FFCC00', fontWeight: '600' }}>Configurações</span></div>
              <h1 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#1e293b', margin: 0, letterSpacing: '-1px' }}>
                Configurações Globais
              </h1>
              <p style={{ color: '#64748b', marginTop: '1rem' }}>Gerencie as informações de contato e dados da empresa que aparecem no site.</p>
            </header>

            <div style={{ maxWidth: '800px' }}>
              <form onSubmit={handleUpdateSettings} style={{ background: 'white', padding: '3rem', borderRadius: '32px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.05)', border: '1px solid white' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                  <div>
                    <label style={{ display: 'block', fontWeight: '700', color: '#1e293b', marginBottom: '0.75rem' }}>Nome da Empresa</label>
                    <input 
                      type="text" 
                      value={settings.companyName}
                      onChange={(e) => setSettings({...settings, companyName: e.target.value})}
                      style={{ width: '100%', padding: '14px', borderRadius: '16px', border: '1px solid #e2e8f0', background: '#f8fafc', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontWeight: '700', color: '#1e293b', marginBottom: '0.75rem' }}>WhatsApp de Suporte</label>
                    <input 
                      type="text" 
                      value={settings.supportWhatsapp}
                      placeholder="+258 8X XXX XXXX"
                      onChange={(e) => setSettings({...settings, supportWhatsapp: e.target.value})}
                      style={{ width: '100%', padding: '14px', borderRadius: '16px', border: '1px solid #e2e8f0', background: '#f8fafc', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontWeight: '700', color: '#1e293b', marginBottom: '0.75rem' }}>E-mail de Contato</label>
                    <input 
                      type="email" 
                      value={settings.supportEmail}
                      placeholder="geral@docacm.com"
                      onChange={(e) => setSettings({...settings, supportEmail: e.target.value})}
                      style={{ width: '100%', padding: '14px', borderRadius: '16px', border: '1px solid #e2e8f0', background: '#f8fafc', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontWeight: '700', color: '#1e293b', marginBottom: '0.75rem' }}>Endereço Principal</label>
                    <input 
                      type="text" 
                      value={settings.address}
                      onChange={(e) => setSettings({...settings, address: e.target.value})}
                      style={{ width: '100%', padding: '14px', borderRadius: '16px', border: '1px solid #e2e8f0', background: '#f8fafc', outline: 'none' }}
                    />
                  </div>
                </div>

                <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'flex-end' }}>
                  <button 
                    type="submit"
                    style={{ 
                      background: 'linear-gradient(135deg, #FFCC00 0%, #d87a1d 100%)', 
                      color: 'white', 
                      padding: '16px 40px', 
                      borderRadius: '18px', 
                      border: 'none', 
                      fontWeight: '800', 
                      fontSize: '1rem', 
                      cursor: 'pointer',
                      boxShadow: '0 10px 15px -3px rgba(255, 204, 0, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px'
                    }}
                  >
                    <Save size={20} /> SALVAR ALTERAÇÕES
                  </button>
                </div>
              </form>
            </div>
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
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#475569', marginBottom: '0.5rem' }}>Imagem do Projeto</label>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    {formData.imageUrl && (
                      <img src={formData.imageUrl} alt="Preview" style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover' }} />
                    )}
                    <label style={{ 
                      flex: 1, 
                      padding: '12px', 
                      background: '#f8fafc', 
                      border: '2px dashed #e2e8f0', 
                      borderRadius: '12px', 
                      textAlign: 'center',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      color: '#64748b'
                    }}>
                      {loadingImage ? 'Fazendo upload...' : (formData.imageUrl ? 'Trocar Imagem' : 'Selecionar Imagem do PC')}
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files[0];
                          if (!file) return;
                          
                          setLoadingImage(true);
                          const reader = new FileReader();
                          reader.readAsDataURL(file);
                          reader.onloadend = async () => {
                            try {
                              const response = await fetch(`${API_URL}/api/upload`, {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ data: reader.result })
                              });
                              const data = await response.json();
                              setFormData({ ...formData, imageUrl: data.url });
                            } catch (err) {
                              showAlert('Erro', 'Não foi possível carregar a imagem selecionada.', 'error');
                            } finally {
                              setLoadingImage(false);
                            }
                          };
                        }}
                        style={{ display: 'none' }}
                      />
                    </label>
                  </div>
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
                  style={{ flex: 1, padding: '12px', borderRadius: '12px', border: 'none', background: '#FFCC00', fontWeight: '600', color: 'white', cursor: 'pointer' }}
                >
                  {editingProject ? 'Salvar Alterações' : 'Criar Projeto'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* PROJECT MANAGEMENT MODAL */}
      {isManageModalOpen && selectedQuote && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '2rem' }}>
          <div style={{ background: 'white', width: '100%', maxWidth: '900px', height: '80vh', borderRadius: '32px', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
            
            {/* Modal Header */}
            <div style={{ padding: '2rem 2.5rem', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc' }}>
              <div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '900', color: '#1e293b', margin: 0 }}>Gestão de Obra: {selectedQuote.serviceType}</h3>
                <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '0.875rem' }}>Cliente: {selectedQuote.clientName} | Ref: #DOCA-{selectedQuote._id.slice(-6).toUpperCase()}</p>
              </div>
              <button onClick={closeManageModal} style={{ background: '#f1f5f9', border: 'none', borderRadius: '12px', padding: '8px', cursor: 'pointer' }}>
                <X size={24} />
              </button>
            </div>

            {/* Modal Tabs */}
            <div style={{ display: 'flex', background: '#f8fafc', padding: '0 2.5rem', gap: '2rem' }}>
              {['general', 'finance', 'execution', 'gallery'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setManageTab(tab)}
                  style={{
                    padding: '1rem 0',
                    border: 'none',
                    background: 'none',
                    color: manageTab === tab ? '#FFCC00' : '#64748b',
                    fontWeight: '800',
                    fontSize: '0.875rem',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    cursor: 'pointer',
                    borderBottom: manageTab === tab ? '3px solid #FFCC00' : '3px solid transparent',
                    transition: 'all 0.2s'
                  }}
                >
                  {tab === 'general' && 'Geral'}
                  {tab === 'finance' && 'Financeiro'}
                  {tab === 'execution' && 'Execução'}
                  {tab === 'gallery' && 'Galeria'}
                </button>
              ))}
            </div>

            {/* Modal Content */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '2.5rem' }}>
              
              {manageTab === 'general' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                  <div>
                    <label style={{ display: 'block', fontWeight: '700', marginBottom: '0.5rem' }}>Status da Obra</label>
                    <select 
                      value={selectedQuote.status}
                      onChange={(e) => handleUpdateQuote({ status: e.target.value })}
                      style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0' }}
                    >
                      <option value="Pendente">Pendente</option>
                      <option value="Em Análise">Em Análise</option>
                      <option value="Aprovado">Aprovado</option>
                      <option value="Em Execução">Em Execução</option>
                      <option value="Finalização">Finalização</option>
                      <option value="Concluído">Concluído</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontWeight: '700', marginBottom: '0.5rem' }}>Orçamento Total (MT)</label>
                    <input 
                      type="number"
                      value={selectedQuote.totalBudget || ''}
                      onChange={(e) => handleUpdateQuote({ totalBudget: Number(e.target.value) })}
                      placeholder="0.00"
                      style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontWeight: '700', marginBottom: '0.5rem' }}>Data de Início</label>
                    <input 
                      type="date"
                      value={selectedQuote.startDate ? new Date(selectedQuote.startDate).toISOString().split('T')[0] : ''}
                      onChange={(e) => handleUpdateQuote({ startDate: e.target.value })}
                      style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontWeight: '700', marginBottom: '0.5rem' }}>Deadline (Data de Entrega)</label>
                    <input 
                      type="date"
                      value={selectedQuote.deadline ? new Date(selectedQuote.deadline).toISOString().split('T')[0] : ''}
                      onChange={(e) => handleUpdateQuote({ deadline: e.target.value })}
                      style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0' }}
                    />
                  </div>

                  {/* ADDITIONAL DETAILS DISPLAY */}
                  {selectedQuote.additionalDetails && Object.keys(selectedQuote.additionalDetails).length > 0 && (
                    <div style={{ gridColumn: '1 / -1', marginTop: '1rem', padding: '1.5rem', background: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                      <p style={{ margin: '0 0 1rem 0', fontWeight: '800', color: '#1e293b', fontSize: '0.85rem', textTransform: 'uppercase' }}>🔧 Especificações Técnicas (Triagem Inteligente)</p>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                        {Object.entries(selectedQuote.additionalDetails).map(([key, value]) => (
                          <div key={key}>
                            <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b', fontWeight: '700', textTransform: 'capitalize' }}>{key.replace(/([A-Z])/g, ' $1')}</p>
                            <p style={{ margin: '4px 0 0', fontWeight: '800', color: '#0f172a' }}>{value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {manageTab === 'finance' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h4 style={{ margin: 0 }}>Histórico de Pagamentos</h4>
                    <button 
                      onClick={() => {
                        showAlert('Adicionar Pagamento', 'Introduza o valor da parcela (MT):', 'prompt', (val) => {
                          if (val && !isNaN(val)) {
                            const newPayments = [...(selectedQuote.payments || []), { amount: Number(val), status: 'Pago', date: new Date() }];
                            handleUpdateQuote({ payments: newPayments });
                          }
                        });
                      }}
                      style={{ background: '#FFCC00', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '10px', fontWeight: '700', cursor: 'pointer' }}
                    >
                      + Novo Pagamento
                    </button>
                  </div>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ textAlign: 'left', borderBottom: '1px solid #f1f5f9' }}>
                        <th style={{ padding: '1rem 0', color: '#64748b' }}>Data</th>
                        <th style={{ padding: '1rem 0', color: '#64748b' }}>Valor</th>
                        <th style={{ padding: '1rem 0', color: '#64748b' }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(selectedQuote.payments || []).map((pay, i) => (
                        <tr key={i} style={{ borderBottom: '1px solid #f8fafc' }}>
                          <td style={{ padding: '1rem 0' }}>{new Date(pay.date).toLocaleDateString()}</td>
                          <td style={{ padding: '1rem 0', fontWeight: '700' }}>{pay.amount.toLocaleString()} MT</td>
                          <td style={{ padding: '1rem 0' }}>
                            <span style={{ background: '#ecfdf5', color: '#10b981', padding: '4px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '800' }}>{pay.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {manageTab === 'execution' && (
                <div>
                  <div style={{ marginBottom: '3rem' }}>
                    <label style={{ display: 'block', fontWeight: '700', marginBottom: '1rem' }}>Estado da Obra: {selectedQuote.percentage || 0}%</label>
                    <input 
                      type="range"
                      min="0"
                      max="100"
                      value={selectedQuote.percentage || 0}
                      onChange={(e) => handleUpdateQuote({ percentage: Number(e.target.value) })}
                      style={{ width: '100%', accentColor: '#FFCC00', height: '10px' }}
                    />
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h4 style={{ margin: 0 }}>Materiais Adquiridos</h4>
                    <button 
                      onClick={() => {
                        showAlert('Nome do Material', 'Introduza o nome do material ou serviço:', 'prompt', (name) => {
                          if (name) {
                            showAlert('Custo do Material', `Introduza o custo de "${name}" (MT):`, 'prompt', (cost) => {
                               if (cost && !isNaN(cost)) {
                                 const newMaterials = [...(selectedQuote.materials || []), { name, cost: Number(cost), date: new Date() }];
                                 handleUpdateQuote({ materials: newMaterials });
                               }
                            });
                          }
                        });
                      }}
                      style={{ background: '#1e293b', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '10px', fontWeight: '700', cursor: 'pointer' }}
                    >
                      + Registar Material
                    </button>
                  </div>
                  {/* Small materials list */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                    {(selectedQuote.materials || []).map((mat, i) => (
                      <div key={i} style={{ padding: '1rem', background: '#f8fafc', borderRadius: '16px', display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                          <p style={{ margin: 0, fontWeight: '700' }}>{mat.name}</p>
                          <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b' }}>{new Date(mat.date).toLocaleDateString()}</p>
                        </div>
                        <p style={{ margin: 0, color: '#FFCC00', fontWeight: '800' }}>{mat.cost.toLocaleString()} MT</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {manageTab === 'gallery' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h4 style={{ margin: 0 }}>Galeria de Evolução da Obra</h4>
                    <label style={{ 
                      background: 'linear-gradient(135deg, #FFCC00 0%, #d87a1d 100%)', 
                      color: 'white', 
                      padding: '12px 24px', 
                      borderRadius: '16px', 
                      fontWeight: '800', 
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <Camera size={20} /> {loadingImage ? 'Processando...' : 'Adicionar Foto à Obra'}
                      <input 
                        type="file" 
                        accept="image/*" 
                        style={{ display: 'none' }} 
                        disabled={loadingImage}
                        onChange={async (e) => {
                          const file = e.target.files[0];
                          if (!file) return;
                          setLoadingImage(true);
                          const reader = new FileReader();
                          reader.readAsDataURL(file);
                          reader.onloadend = async () => {
                            try {
                              const res = await fetch(`${API_URL}/api/upload`, {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ data: reader.result })
                              });
                              const data = await res.json();
                              const newPhotos = [...(selectedQuote.workPhotos || []), data.url];
                              handleUpdateQuote({ workPhotos: newPhotos });
                            } catch (err) {
                               showAlert('Erro', 'Falha no upload', 'error');
                            } finally {
                              setLoadingImage(false);
                            }
                          };
                        }}
                      />
                    </label>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1.5rem' }}>
                    {(selectedQuote.workPhotos || []).map((photo, i) => (
                      <div key={i} style={{ borderRadius: '16px', overflow: 'hidden', height: '180px', position: 'relative', border: '1px solid #e2e8f0' }}>
                        <img src={photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <button 
                          onClick={() => {
                            const newPhotos = selectedQuote.workPhotos.filter((_, index) => index !== i);
                            handleUpdateQuote({ workPhotos: newPhotos });
                          }}
                          style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '8px', padding: '6px', cursor: 'pointer' }}
                        >
                          <Trash2 size={14} color="#ef4444" />
                        </button>
                      </div>
                    ))}
                    {(selectedQuote.workPhotos || []).length === 0 && (
                      <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '3rem', color: '#94a3b8', border: '2px dashed #e2e8f0', borderRadius: '24px' }}>
                        Nenhuma foto registada para esta obra.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      {/* Modern Alert Component */}
      <ModernAlert 
        {...alertConfig} 
        onClose={() => setAlertConfig({ ...alertConfig, isOpen: false })} 
      />
    </div>
  );
};

export default Dashboard;
