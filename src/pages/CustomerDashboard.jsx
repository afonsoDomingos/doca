import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  Plus, 
  ArrowRight, 
  ChevronRight, 
  LogOut, 
  LayoutDashboard,
  X,
  Calendar,
  DollarSign,
  ExternalLink,
  MessageSquare,
  User,
  Settings,
  MapPin,
  CreditCard,
  Camera,
  Home,
  Menu
} from 'lucide-react';
import QuoteForm from '../components/QuoteForm';
import WhatsAppContact from '../components/WhatsAppContact';
import { motion, AnimatePresence } from 'framer-motion';
import ModernAlert from '../components/ModernAlert';

const API_URL = import.meta.env.VITE_API_BASE_URL || (import.meta.env.DEV ? 'http://localhost:5000' : '');

const CustomerDashboard = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' or 'profile'
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedActiveProject, setSelectedActiveProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Profile Form State
  const [profileForm, setProfileForm] = useState({
    name: '',
    email: '',
    phone: '',
    nuit: '',
    address: '',
    photo: ''
  });
  const [updatingProfile, setUpdatingProfile] = useState(false);
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
    const userData = localStorage.getItem('customerUser');
    if (!userData) {
      navigate('/portal/login');
      return;
    }
    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    setProfileForm({
      name: parsedUser.name || '',
      email: parsedUser.email || '',
      phone: parsedUser.phone || '',
      nuit: parsedUser.nuit || '',
      address: parsedUser.address || '',
      photo: parsedUser.photo || ''
    });
    fetchQuotes(parsedUser.id);
  }, [navigate]);

  const fetchQuotes = async (userId) => {
    try {
      const response = await fetch(`${API_URL}/api/user/quotes/${userId}`);
      const data = await response.json();
      setQuotes(data);
    } catch (err) {
      console.error('Error fetching quotes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setUpdatingProfile(true);
    try {
      const response = await fetch(`${API_URL}/api/user/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileForm)
      });
      if (response.ok) {
        const updated = await response.json();
        const newUser = { ...user, ...updated };
        localStorage.setItem('customerUser', JSON.stringify(newUser));
        setUser(newUser);
        showAlert('Sucesso', 'Perfil atualizado com sucesso!', 'success');
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      showAlert('Erro', 'Ocorreu um erro ao atualizar o seu perfil.', 'error');
    } finally {
      setUpdatingProfile(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('customerUser');
    navigate('/portal/login');
  };

  const filteredQuotes = quotes.filter(q => 
    q.serviceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Concluído': return '#10b981';
      case 'Em Análise': return '#3b82f6';
      case 'Cancelado': return '#ef4444';
      default: return '#FFCC00';
    }
  };

  if (!user) return null;

  return (
    <div className="dashboard-wrapper" style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc', fontFamily: 'Inter, sans-serif' }}>
      <style dangerouslySetInnerHTML={{__html: `
        .mobile-header { display: none; }
        .overlay { display: none; }
        @media (max-width: 1024px) {
          .dashboard-sidebar {
             transform: translateX(-100%) !important;
             transition: transform 0.3s ease !important;
             width: 280px !important;
          }
          .dashboard-sidebar.sidebar-open {
             transform: translateX(0) !important;
          }
          .dashboard-main {
             margin-left: 0 !important;
             padding: 100px 1.5rem 2rem 1.5rem !important;
             width: 100% !important;
          }
          .mobile-header {
             display: flex !important;
             align-items: center;
             justify-content: space-between;
             padding: 1rem 1.5rem;
             background: #000;
             color: white;
             position: fixed;
             top: 0;
             left: 0;
             width: 100%;
             z-index: 90;
             box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          }
          .dashboard-stats-grid {
             grid-template-columns: 1fr !important;
             gap: 1.5rem !important;
          }
          .dashboard-projects-grid {
             grid-template-columns: 1fr !important;
          }
          .header-actions {
             flex-direction: column !important;
             align-items: center !important;
             text-align: center !important;
             gap: 1.5rem !important;
          }
          .dashboard-profile-flex {
             grid-template-columns: 1fr !important;
          }
          .overlay.sidebar-open {
             display: block !important;
             position: fixed !important;
             top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important;
             background: rgba(0,0,0,0.5) !important;
             z-index: 99 !important;
          }
        }
      `}} />

      {/* Overlay */}
      <div 
        className={`overlay ${isMobileMenuOpen ? 'sidebar-open' : ''}`} 
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>

      {/* Mobile Header */}
      <div className="mobile-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ background: '#FFCC00', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <LayoutDashboard size={18} color="white" />
          </div>
          <span style={{ fontSize: '1.2rem', fontWeight: '800', color: 'white', letterSpacing: '-0.5px' }}>DOCA <span style={{ color: '#FFCC00' }}>PORTAL</span></span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(true)} style={{ color: 'white', background: 'transparent', border: 'none' }}>
          <Menu size={28} />
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`dashboard-sidebar ${isMobileMenuOpen ? 'sidebar-open' : ''}`} style={{ 
        width: '280px', 
        background: '#000000', 
        padding: '2.5rem 1.8rem 5rem 1.8rem',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        height: '100vh',
        zIndex: 100,
        boxShadow: '4px 0 24px rgba(0,0,0,0.1)',
        color: 'white',
        top: 0,
        left: 0,
        overflowY: 'auto',
        overflowX: 'hidden'
      }}>
        {/* Ir para o Site Button - High Visibility */}
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/')}
          style={{
            width: '100%',
            padding: '12px',
            background: 'transparent',
            border: '2px solid #FFCC00',
            color: '#FFCC00',
            borderRadius: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            fontWeight: '900',
            fontSize: '0.8rem',
            marginBottom: '2.5rem',
            cursor: 'pointer',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}
        >
          <Home size={18} /> Ir para a Página Inicial
        </motion.button>

        <div style={{ marginBottom: '3rem', padding: '0 0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ background: '#FFCC00', width: '40px', height: '40px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <LayoutDashboard size={20} color="white" />
            </div>
            <span style={{ fontSize: '1.25rem', fontWeight: '800', color: 'white', letterSpacing: '-0.5px' }}>DOCA <span style={{ color: '#FFCC00' }}>PORTAL</span></span>
          </div>
        </div>

        <nav style={{ flex: 1 }}>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1.5rem', padding: '0 0.5rem' }}>Gestão</p>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li 
              onClick={() => setActiveTab('orders')}
              style={{ 
                background: activeTab === 'orders' ? '#FFCC00' : 'transparent', 
                color: 'white', 
                padding: '14px 18px', 
                borderRadius: '16px', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px',
                cursor: 'pointer',
                fontWeight: '700',
                transition: '0.3s'
              }}
            >
              <FileText size={20} /> Meus Pedidos
            </li>
            <li 
              onClick={() => setActiveTab('profile')}
              style={{ 
                background: activeTab === 'profile' ? '#FFCC00' : 'transparent', 
                color: 'white', 
                padding: '14px 18px', 
                borderRadius: '16px', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px',
                cursor: 'pointer',
                fontWeight: '700',
                transition: '0.3s'
              }}
            >
              <User size={20} /> Meu Perfil
            </li>
          </ul>
        </nav>
        <WhatsAppContact variant="sidebar" />

        <button 
          onClick={handleLogout}
          style={{ 
            width: '100%', 
            padding: '14px', 
            background: 'transparent', 
            color: 'rgba(255,255,255,0.6)', 
            border: 'none', 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: '700'
          }}
        >
          <LogOut size={16} /> Sair do Sistema
        </button>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main" style={{ marginLeft: '280px', flex: 1, padding: '3rem 5rem', background: '#f1f5f9', minHeight: '100vh' }}>
        {activeTab === 'orders' ? (
          <>
            <header className="header-actions" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
              <div className="desktop-profile" style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                <div style={{ 
                  width: '80px', 
                  height: '80px', 
                  background: user.photo ? `url(${user.photo})` : '#000000',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderRadius: '24px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '2rem',
                  fontWeight: '900',
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)',
                  border: '4px solid white'
                }}>
                  {!user.photo && user.name.charAt(0)}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '0.9rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
                    Painel do Cliente DOCA <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#FFCC00' }}></div> Online
                  </div>
                  <h1 style={{ fontSize: '3rem', fontWeight: '900', color: '#0f172a', margin: 0, letterSpacing: '-2px', lineHeight: 1 }}>
                    Olá, {user.name.split(' ')[0]}
                  </h1>
                </div>
              </div>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsQuoteModalOpen(true)}
                style={{ 
                  padding: '18px 36px', 
                  background: '#000000', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '24px', 
                  fontWeight: '900', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px', 
                  cursor: 'pointer',
                  boxShadow: '0 20px 30px -10px rgba(0, 0, 0, 0.4)',
                  fontSize: '1rem'
                }}
              >
                SOLICITAR ORÇAMENTO <ArrowRight size={22} />
              </motion.button>
            </header>

            {/* Stats Grid */}
            <div className="dashboard-stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2.5rem', marginBottom: '5rem' }}>
              {[
                { label: 'Pedidos Realizados', val: quotes.length, icon: FileText, color: '#003366' },
                { label: 'Obras em Análise', val: quotes.filter(q => q.status === 'Pendente' || q.status === 'Em Análise').length, icon: Clock, color: '#FFCC00' },
                { label: 'Projectos Concluídos', val: quotes.filter(q => q.status === 'Concluído').length, icon: CheckCircle, color: '#10b981' }
              ].map((stat, i) => (
                <div key={i} style={{ background: 'white', padding: '2.5rem', borderRadius: '32px', border: '1px solid white', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.03)' }}>
                  <div style={{ color: stat.color, marginBottom: '1.5rem', background: `${stat.color}18`, width: '48px', height: '48px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <stat.icon size={22} />
                  </div>
                  <p style={{ color: '#64748b', fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', margin: 0 }}>{stat.label}</p>
                  <h3 style={{ fontSize: '3rem', fontWeight: '950', color: '#0f172a', margin: '10px 0 0 0', letterSpacing: '-1px' }}>{stat.val}</h3>
                </div>
              ))}
            </div>

            {/* ACTIVE PROJECTS */}
            {quotes.some(q => q.percentage > 0 || q.status === 'Em Execução' || q.status === 'Finalização') && (
              <div style={{ marginBottom: '4rem' }}>
                <h2 style={{ fontSize: '1.75rem', fontWeight: '900', color: '#1e293b', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <LayoutDashboard size={28} color="#FFCC00" /> Acompanhamento de Obras
                </h2>
                <div className="dashboard-projects-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '2rem' }}>
                  {quotes.filter(q => q.percentage > 0 || q.status === 'Em Execução' || q.status === 'Finalização').map((proj) => {
                    const totalPaid = (proj.payments || []).reduce((acc, curr) => acc + curr.amount, 0);
                    return (
                      <div key={proj._id} style={{ background: 'white', borderRadius: '32px', border: '1px solid white', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                        <div style={{ height: '220px', background: proj.workPhotos?.length > 0 ? `url(${proj.workPhotos[proj.workPhotos.length - 1]})` : '#003366', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
                          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}></div>
                          <div style={{ position: 'absolute', bottom: '20px', left: '25px', right: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                            <div>
                              <span style={{ background: '#FFCC00', color: 'white', padding: '6px 12px', borderRadius: '100px', fontSize: '0.7rem', fontWeight: '900' }}>{proj.status}</span>
                              <h3 style={{ color: 'white', margin: '8px 0 0', fontSize: '1.5rem', fontWeight: '900' }}>{proj.serviceType}</h3>
                            </div>
                            <div style={{ color: 'white', textAlign: 'right' }}>
                               <p style={{ margin: 0, fontSize: '0.7rem', opacity: 0.6 }}>TOTAL</p>
                               <p style={{ margin: 0, fontSize: '1rem', fontWeight: '900' }}>{(proj.totalBudget || 0).toLocaleString()} MT</p>
                            </div>
                          </div>
                        </div>
                        <div style={{ padding: '2rem' }}>
                          <div style={{ marginBottom: '1.5rem' }}>
                             <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                               <span style={{ fontWeight: '800', color: '#64748b', fontSize: '0.8rem' }}>PROGRESSO</span>
                               <span style={{ fontWeight: '900', color: '#FFCC00' }}>{proj.percentage || 0}%</span>
                             </div>
                             <div style={{ height: '8px', background: '#f1f5f9', borderRadius: '10px', overflow: 'hidden' }}>
                               <motion.div initial={{ width: 0 }} animate={{ width: `${proj.percentage || 0}%` }} style={{ height: '100%', background: '#FFCC00' }} />
                             </div>
                          </div>
                          <button 
                            onClick={() => setSelectedActiveProject(proj)}
                            style={{ width: '100%', background: '#003366', color: 'white', border: 'none', padding: '14px', borderRadius: '16px', fontWeight: '800', cursor: 'pointer' }}
                          >
                            VER RELATÓRIO
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* QUOTES TABLE */}
            <div style={{ background: 'white', borderRadius: '32px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.03)', padding: '2.5rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '900', color: '#0f172a', marginBottom: '2rem' }}>Histórico de Pedidos</h2>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 12px', textAlign: 'left' }}>
                  <thead>
                    <tr>
                      <th style={{ padding: '0 1rem', color: '#94a3b8', fontSize: '0.75rem', fontWeight: '800' }}>SERVIÇO</th>
                      <th style={{ padding: '0 1rem', color: '#94a3b8', fontSize: '0.75rem', fontWeight: '800' }}>DATA</th>
                      <th style={{ padding: '0 1rem', color: '#94a3b8', fontSize: '0.75rem', fontWeight: '800' }}>ESTADO</th>
                      <th style={{ padding: '0 1rem', color: '#94a3b8', fontSize: '0.75rem', fontWeight: '800', textAlign: 'right' }}>AÇÕES</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredQuotes.map((quote) => (
                      <tr key={quote._id} style={{ background: '#f8fafc' }}>
                        <td style={{ padding: '1.5rem 1rem', borderTopLeftRadius: '20px', borderBottomLeftRadius: '20px' }}>
                          <span style={{ fontWeight: '800', color: '#0f172a' }}>{quote.serviceType}</span>
                        </td>
                        <td style={{ padding: '1.5rem 1rem' }}>
                          <span style={{ color: '#64748b', fontWeight: '600' }}>{new Date(quote.createdAt).toLocaleDateString()}</span>
                        </td>
                        <td style={{ padding: '1.5rem 1rem' }}>
                          <span style={{ background: `${getStatusColor(quote.status)}15`, color: getStatusColor(quote.status), padding: '6px 14px', borderRadius: '100px', fontSize: '0.7rem', fontWeight: '900' }}>
                            {quote.status.toUpperCase()}
                          </span>
                        </td>
                        <td style={{ padding: '1.5rem 1rem', textAlign: 'right', borderTopRightRadius: '20px', borderBottomRightRadius: '20px' }}>
                          <button onClick={() => showAlert('Detalhes do Pedido', quote.description, 'info')} style={{ background: 'white', border: '1px solid #e2e8er0', padding: '8px 16px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer' }}>Detalhes</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#0f172a', marginBottom: '2rem' }}>Configurações do Perfil</h1>
            
            <form onSubmit={handleUpdateProfile} style={{ background: 'white', padding: '3rem', borderRadius: '32px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.05)' }}>
              <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <div style={{ 
                  width: '120px', 
                  height: '120px', 
                  margin: '0 auto 1.5rem', 
                  background: profileForm.photo ? `url(${profileForm.photo})` : '#003366',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderRadius: '32px', 
                  border: '6px solid #f1f5f9',
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: 'white',
                  cursor: 'pointer',
                  position: 'relative'
                }}>
                  {!profileForm.photo && <Camera size={40} />}
                  <div style={{ position: 'absolute', bottom: '-10px', right: '-10px', background: '#FFCC00', width: '40px', height: '40px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', border: '4px solid white' }}>
                    <Plus size={20} />
                  </div>
                </div>
                <input 
                  type="text" 
                  placeholder="URL da Foto de Perfil"
                  value={profileForm.photo}
                  onChange={(e) => setProfileForm({...profileForm, photo: e.target.value})}
                  style={{ width: '100%', maxWidth: '400px', padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '0.8rem', textAlign: 'center' }}
                />
              </div>

              <div className="dashboard-profile-flex" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', color: '#64748b', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '8px' }}>Nome Completo / Empresa</label>
                  <div style={{ position: 'relative' }}>
                    <User size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#cbd5e1' }} />
                    <input 
                      required
                      type="text"
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
                      style={{ width: '100%', padding: '14px 14px 14px 50px', borderRadius: '16px', border: '1px solid #e2e8f0', background: '#f8fafc', fontWeight: '600' }}
                    />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', color: '#64748b', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '8px' }}>Email Corporativo</label>
                  <input 
                    required
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({...profileForm, email: e.target.value})}
                    style={{ width: '100%', padding: '14px', borderRadius: '16px', border: '1px solid #e2e8f0', background: '#f8fafc', fontWeight: '600' }}
                  />
                </div>
              </div>

              <div className="dashboard-profile-flex" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', color: '#64748b', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '8px' }}>Contacto Telefónico</label>
                  <input 
                    type="text"
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})}
                    style={{ width: '100%', padding: '14px', borderRadius: '16px', border: '1px solid #e2e8f0', background: '#f8fafc', fontWeight: '600' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', color: '#64748b', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '8px' }}>NUIT (Identificação Fiscal)</label>
                  <div style={{ position: 'relative' }}>
                    <CreditCard size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#cbd5e1' }} />
                    <input 
                      type="text"
                      placeholder="Ex: 500293841"
                      value={profileForm.nuit}
                      onChange={(e) => setProfileForm({...profileForm, nuit: e.target.value})}
                      style={{ width: '100%', padding: '14px 14px 14px 50px', borderRadius: '16px', border: '1px solid #e2e8f0', background: '#f8fafc', fontWeight: '600' }}
                    />
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: '2.5rem' }}>
                <label style={{ display: 'block', fontWeight: '800', color: '#64748b', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '8px' }}>Endereço</label>
                <div style={{ position: 'relative' }}>
                  <MapPin size={18} style={{ position: 'absolute', left: '16px', top: '16px', color: '#cbd5e1' }} />
                  <textarea 
                    value={profileForm.address}
                    onChange={(e) => setProfileForm({...profileForm, address: e.target.value})}
                    style={{ width: '100%', padding: '14px 14px 14px 50px', borderRadius: '16px', border: '1px solid #e2e8f0', background: '#f8fafc', fontWeight: '600', minHeight: '100px', resize: 'none' }}
                  />
                </div>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={updatingProfile}
                style={{ width: '100%', padding: '18px', background: '#FFCC00', color: 'white', border: 'none', borderRadius: '20px', fontWeight: '900', fontSize: '1rem', cursor: 'pointer', boxShadow: '0 10px 20px -5px rgba(235, 137, 35, 0.4)' }}
              >
                {updatingProfile ? 'GUARDANDO ALTERAÇÕES...' : 'ATUALIZAR MEU PERFIL DOCA'}
              </motion.button>
            </form>
          </motion.div>
        )}
      </main>

      {/* NEW QUOTE MODAL */}
      <AnimatePresence>
        {isQuoteModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'fixed', inset: 0, background: 'rgba(0, 51, 102, 0.8)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '2rem' }}>
            <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }} style={{ background: 'white', width: '100%', maxWidth: '650px', borderRadius: '40px', overflow: 'hidden', position: 'relative' }}>
              <button 
                onClick={() => setIsQuoteModalOpen(false)} 
                style={{ position: 'absolute', top: '24px', right: '24px', background: '#f1f5f9', border: 'none', borderRadius: '12px', padding: '10px', cursor: 'pointer', zIndex: 10 }}
              >
                <X size={20} />
              </button>
              <div style={{ padding: '20px' }}>
                <QuoteForm onComplete={() => {
                  setIsQuoteModalOpen(false);
                  fetchQuotes(user.id);
                }} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PROJECT REPORT MODAL */}
      {selectedActiveProject && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0, 0, 0, 0.8)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100, padding: '2rem' }}>
          <div style={{ background: 'white', width: '100%', maxWidth: '1000px', height: '90vh', borderRadius: '40px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '2rem', background: '#003366', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ margin: 0 }}>Monitoria de Obra DOCA</h2>
              <X size={24} style={{ cursor: 'pointer' }} onClick={() => setSelectedActiveProject(null)} />
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '3rem' }}>
               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
                  <div>
                    <h3 style={{ fontWeight: '900', color: '#003366' }}>Resumo Executivo</h3>
                    <p>Referência: {selectedActiveProject._id.slice(-8).toUpperCase()}</p>
                    <p>Estado: {selectedActiveProject.status}</p>
                    <p>Total: {selectedActiveProject.totalBudget?.toLocaleString()} MT</p>
                    
                    <h4 style={{ marginTop: '2rem' }}>Fotos da Evolução</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      {selectedActiveProject.workPhotos?.map((p, i) => <img key={i} src={p} style={{ width: '100%', borderRadius: '16px' }} />)}
                    </div>
                  </div>
                  <div>
                    <div style={{ padding: '2rem', background: '#f8fafc', borderRadius: '24px' }}>
                       <h4 style={{ margin: 0, color: '#003366' }}>Pagamentos Efetuados</h4>
                       {selectedActiveProject.payments?.map((p, i) => (
                         <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #e2e8f0' }}>
                           <span>{p.amount.toLocaleString()} MT</span>
                           <span style={{ color: '#10b981', fontWeight: 'bold' }}>✓ PAGO</span>
                         </div>
                       ))}
                    </div>
                  </div>
               </div>
            </div>
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

export default CustomerDashboard;
