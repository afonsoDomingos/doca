import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  MessageCircle, 
  User, 
  LogOut, 
  ChevronRight, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  FileText,
  Calendar,
  ArrowRight,
  Plus,
  X,
  ExternalLink
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_BASE_URL || (import.meta.env.DEV ? 'http://localhost:5000' : '');

const CustomerDashboard = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedActiveProject, setSelectedActiveProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [newQuote, setNewQuote] = useState({
    serviceType: '',
    budgetRange: '',
    description: '',
    additionalDetails: {}
  });
  const [submitting, setSubmitting] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('customerUser');
    if (!userData) {
      navigate('/portal/login');
      return;
    }
    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
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

  const handleLogout = () => {
    localStorage.removeItem('customerUser');
    navigate('/');
  };

  const handleCreateQuote = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch(`${API_URL}/api/quotes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newQuote,
          clientName: user.name,
          email: user.email,
          phone: user.phone || 'N/A',
          userId: user.id,
          additionalDetails: newQuote.additionalDetails
        })
      });
      if (response.ok) {
        setIsQuoteModalOpen(false);
        setNewQuote({ serviceType: '', budgetRange: '', description: '', additionalDetails: {} });
        fetchQuotes(user.id);
      }
    } catch (err) {
      console.error('Error creating quote:', err);
    } finally {
      setSubmitting(false);
    }
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
      default: return '#f59e0b';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Concluído': return <CheckCircle size={16} />;
      case 'Em Análise': return <Clock size={16} />;
      case 'Cancelado': return <AlertCircle size={16} />;
      default: return <Clock size={16} />;
    }
  };

  if (!user) return null;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc', fontFamily: 'Inter, sans-serif' }}>
      {/* Sidebar */}
      <aside style={{ 
        width: '280px', 
        background: '#ffffff', 
        borderRight: '1px solid #e2e8f0',
        padding: '2rem 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        height: '100vh',
        zIndex: 100
      }}>
        <div style={{ marginBottom: '3rem', padding: '0 0.5rem' }}>
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ background: '#003366', width: '40px', height: '40px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <LayoutDashboard size={20} color="white" />
            </div>
            <span style={{ fontSize: '1.25rem', fontWeight: '800', color: '#1e293b', letterSpacing: '-0.5px' }}>DOCA <span style={{ color: '#eb8923' }}>PORTAL</span></span>
          </Link>
        </div>

        <nav style={{ flex: 1 }}>
          <p style={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1.5rem', padding: '0 0.5rem' }}>Menu</p>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li style={{ 
              background: 'rgba(0, 51, 102, 0.05)', 
              color: '#003366', 
              padding: '12px 16px', 
              borderRadius: '12px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px',
              cursor: 'pointer',
              fontWeight: '600'
            }}>
              <FileText size={20} /> Meus Pedidos
            </li>
            <li 
              onClick={() => navigate('/')}
              style={{ 
                color: '#64748b', 
                padding: '12px 16px', 
                borderRadius: '12px', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px',
                cursor: 'pointer',
                fontWeight: '500',
                transition: 'all 0.2s',
                marginTop: '10px',
                border: '1px solid #f1f5f9'
              }}>
              <ExternalLink size={20} /> Ir para o Site
            </li>
          </ul>
        </nav>

        <div style={{ marginTop: 'auto', padding: '1.5rem', background: '#f8fafc', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#003366', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
              {user.name.charAt(0)}
            </div>
            <div style={{ overflow: 'hidden' }}>
              <p style={{ fontSize: '0.875rem', fontWeight: '700', color: '#1e293b', margin: 0, whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{user.name}</p>
              <p style={{ fontSize: '0.75rem', color: '#64748b', margin: 0 }}>Cliente Doca</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            style={{ 
              width: '100%', 
              padding: '10px', 
              background: 'white', 
              color: '#f87171', 
              border: '1px solid #fee2e2', 
              borderRadius: '12px',
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
            <LogOut size={16} /> Sair do Portal
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ marginLeft: '280px', flex: 1, padding: '2.5rem 4rem', background: '#f1f5f9' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
              Portal do Cliente <ChevronRight size={14} /> <span style={{ color: '#003366', fontWeight: '600' }}>Início</span>
            </div>
            <h1 style={{ fontSize: '2.75rem', fontWeight: '900', color: '#1e293b', margin: 0, letterSpacing: '-1.5px' }}>
              Olá, {user.name.split(' ')[0]} 👋
            </h1>
            <p style={{ color: '#64748b', marginTop: '8px', fontSize: '1.1rem', fontWeight: '500' }}>
              Estamos prontos para transformar as suas ideias em realidade.
            </p>
          </div>
          <button 
            onClick={() => setIsQuoteModalOpen(true)}
            style={{ 
              padding: '16px 32px', 
              background: 'linear-gradient(135deg, #eb8923 0%, #d87a1d 100%)', 
              color: 'white', 
              border: 'none', 
              borderRadius: '20px', 
              fontWeight: '800', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px', 
              cursor: 'pointer',
              boxShadow: '0 12px 20px -5px rgba(235, 137, 35, 0.4)',
              transition: 'all 0.3s'
            }}
          >
            NOVO ORÇAMENTO <Plus size={22} />
          </button>
        </header>

        {/* Info Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginBottom: '4rem' }}>
          <div style={{ background: 'white', padding: '2rem', borderRadius: '32px', border: '1px solid white', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)' }}>
            <div style={{ color: '#003366', marginBottom: '1.5rem', background: 'rgba(0, 51, 102, 0.05)', width: '50px', height: '50px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FileText size={24} />
            </div>
            <p style={{ color: '#64748b', fontSize: '0.875rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', margin: 0 }}>Histórico Total</p>
            <h3 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#1e293b', margin: '8px 0 0 0' }}>{quotes.length}</h3>
          </div>
          <div style={{ background: 'white', padding: '2rem', borderRadius: '32px', border: '1px solid white', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)' }}>
            <div style={{ color: '#eb8923', marginBottom: '1.5rem', background: 'rgba(235, 137, 35, 0.05)', width: '50px', height: '50px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Clock size={24} />
            </div>
            <p style={{ color: '#64748b', fontSize: '0.875rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', margin: 0 }}>Em Análise</p>
            <h3 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#1e293b', margin: '8px 0 0 0' }}>{quotes.filter(q => q.status === 'Pendente' || q.status === 'Em Análise').length}</h3>
          </div>
          <div style={{ background: 'white', padding: '2rem', borderRadius: '32px', border: '1px solid white', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)' }}>
            <div style={{ color: '#10b981', marginBottom: '1.5rem', background: 'rgba(16, 185, 129, 0.05)', width: '50px', height: '50px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckCircle size={24} />
            </div>
            <p style={{ color: '#64748b', fontSize: '0.875rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', margin: 0 }}>Projetos Concluídos</p>
            <h3 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#1e293b', margin: '8px 0 0 0' }}>{quotes.filter(q => q.status === 'Concluído').length}</h3>
          </div>
        </div>

        {/* ACTIVE PROJECTS SECTION (Only if any) */}
        {quotes.some(q => q.percentage > 0 || q.status === 'Em Execução' || q.status === 'Finalização') && (
          <div style={{ marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: '900', color: '#1e293b', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <LayoutDashboard size={28} color="#eb8923" /> Acompanhamento de Obras
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '2rem' }}>
              {quotes.filter(q => q.percentage > 0 || q.status === 'Em Execução' || q.status === 'Finalização').map((proj) => {
                const totalPaid = (proj.payments || []).reduce((acc, curr) => acc + curr.amount, 0);
                const daysLeft = proj.deadline ? Math.ceil((new Date(proj.deadline) - new Date()) / (1000 * 60 * 60 * 24)) : null;
                
                return (
                  <div key={proj._id} style={{ background: 'white', borderRadius: '32px', border: '1px solid white', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                    <div style={{ height: '200px', background: proj.workPhotos?.length > 0 ? `url(${proj.workPhotos[proj.workPhotos.length - 1]})` : '#1e293b', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}></div>
                      <div style={{ position: 'absolute', bottom: '20px', left: '20px' }}>
                        <span style={{ background: '#eb8923', color: 'white', padding: '4px 12px', borderRadius: '100px', fontSize: '0.7rem', fontWeight: '900', textTransform: 'uppercase' }}>{proj.status}</span>
                        <h3 style={{ color: 'white', margin: '8px 0 0', fontSize: '1.5rem', fontWeight: '800' }}>{proj.serviceType}</h3>
                      </div>
                    </div>
                    
                    <div style={{ padding: '2rem' }}>
                      {/* Progress Bar */}
                      <div style={{ marginBottom: '2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                          <span style={{ fontWeight: '700', color: '#475569' }}>Progresso da Obra</span>
                          <span style={{ fontWeight: '900', color: '#eb8923' }}>{proj.percentage || 0}%</span>
                        </div>
                        <div style={{ height: '12px', background: '#f1f5f9', borderRadius: '10px', overflow: 'hidden' }}>
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${proj.percentage || 0}%` }}
                            style={{ height: '100%', background: 'linear-gradient(90deg, #eb8923, #f59e0b)', borderRadius: '10px' }}
                          />
                        </div>
                      </div>

                      {/* Finance Summary */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
                        <div style={{ padding: '1.25rem', background: '#f8fafc', borderRadius: '20px' }}>
                          <p style={{ margin: 0, fontSize: '0.75rem', fontWeight: '700', color: '#64748b' }}>INVESTIMENTO PAGO</p>
                          <p style={{ margin: '5px 0 0', fontSize: '1.1rem', fontWeight: '900', color: '#1e293b' }}>{totalPaid.toLocaleString()} MT</p>
                        </div>
                        <div style={{ padding: '1.25rem', background: '#fef3c7', borderRadius: '20px' }}>
                          <p style={{ margin: 0, fontSize: '0.75rem', fontWeight: '700', color: '#92400e' }}>TOTAL PREVISTO</p>
                          <p style={{ margin: '5px 0 0', fontSize: '1.1rem', fontWeight: '900', color: '#92400e' }}>{(proj.totalBudget || 0).toLocaleString()} MT</p>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f1f5f9', paddingTop: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <Clock size={20} color="#64748b" />
                          <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#475569' }}>
                            {daysLeft !== null ? (daysLeft > 0 ? `Entrega em ${daysLeft} dias` : 'Prazo de Entrega atingido') : 'Prazo a definir'}
                          </span>
                        </div>
                        <button 
                          onClick={() => setSelectedActiveProject(proj)}
                          style={{ background: '#003366', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '14px', fontWeight: '700', cursor: 'pointer', fontSize: '0.875rem' }}
                        >
                          Ver Relatório Completo
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* My Quotes List Table */}
        <div style={{ background: 'white', borderRadius: '32px', border: '1px solid white', overflow: 'hidden', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.05)' }}>
          <div style={{ padding: '2rem 2.5rem', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#1e293b', margin: 0 }}>Meus Orçamentos & Pedidos</h2>
            
            <div style={{ position: 'relative' }}>
              <input 
                type="text" 
                placeholder="Pesquisar serviço..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ 
                  padding: '10px 16px', 
                  borderRadius: '14px', 
                  border: '1px solid #e2e8f0', 
                  fontSize: '0.875rem',
                  width: '240px',
                  outline: 'none'
                }}
              />
            </div>
          </div>
          
          {loading ? (
            <div style={{ padding: '6rem', textAlign: 'center', color: '#64748b' }}>A carregar os seus dados de luxo...</div>
          ) : filteredQuotes.length === 0 ? (
            <div style={{ padding: '8rem', textAlign: 'center' }}>
              <div style={{ color: '#cbd5e1', marginBottom: '1.5rem' }}>
                <FileText size={64} style={{ margin: '0 auto' }} />
              </div>
              <p style={{ color: '#64748b', fontSize: '1.25rem', fontWeight: '500' }}>Ainda não fez nenhum pedido de orçamento.</p>
              <button onClick={() => setIsQuoteModalOpen(true)} style={{ color: '#eb8923', fontWeight: '800', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.1rem', marginTop: '1rem' }}>Solicitar Agora →</button>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: '#f8fafc' }}>
                    <th style={{ padding: '1.5rem 2.5rem', color: '#64748b', fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>Serviço Solicitado</th>
                    <th style={{ padding: '1.5rem 2.5rem', color: '#64748b', fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>Data do Pedido</th>
                    <th style={{ padding: '1.5rem 2.5rem', color: '#64748b', fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>Status da Obra</th>
                    <th style={{ padding: '1.5rem 2.5rem', color: '#64748b', fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', textAlign: 'right' }}>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredQuotes.map((quote) => (
                    <tr key={quote._id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'all 0.2s' }}>
                      <td style={{ padding: '1.5rem 2.5rem' }}>
                        <p style={{ fontWeight: '800', color: '#1e293b', margin: 0, fontSize: '1.1rem' }}>{quote.serviceType}</p>
                        <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: '4px 0 0' }}>Ref: #DOCA-{quote._id.slice(-6).toUpperCase()}</p>
                      </td>
                      <td style={{ padding: '1.5rem 2.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#475569', fontSize: '0.95rem', fontWeight: '500' }}>
                          <Calendar size={16} color="#94a3b8" /> {new Date(quote.createdAt).toLocaleDateString('pt-MZ')}
                        </div>
                      </td>
                      <td style={{ padding: '1.5rem 2.5rem' }}>
                        <div style={{ 
                          display: 'inline-flex', 
                          alignItems: 'center', 
                          gap: '8px', 
                          padding: '8px 16px', 
                          borderRadius: '100px', 
                          fontSize: '0.75rem', 
                          fontWeight: '800',
                          background: `${getStatusColor(quote.status)}15`,
                          color: getStatusColor(quote.status),
                          border: `1px solid ${getStatusColor(quote.status)}30`
                        }}>
                          {getStatusIcon(quote.status)}
                          {quote.status.toUpperCase()}
                        </div>
                      </td>
                      <td style={{ padding: '1.5rem 2.5rem', textAlign: 'right' }}>
                        <button 
                          onClick={() => alert(`Detalhes da Obra:\n\nServiço: ${quote.serviceType}\nAlcance: ${quote.budgetRange}\nStatus: ${quote.status}\n\nNota da Administração: ${quote.adminNotes || 'O seu pedido está a ser analisado pela nossa equipe técnica.'}`)}
                          style={{ 
                            background: '#003366', 
                            border: 'none', 
                            color: 'white', 
                            padding: '10px 20px', 
                            borderRadius: '14px', 
                            fontWeight: '700', 
                            fontSize: '0.875rem',
                            cursor: 'pointer',
                            boxShadow: '0 4px 6px -1px rgba(0, 51, 102, 0.2)'
                          }}
                        >
                          Detalhes
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* NEW QUOTE MODAL */}
      {isQuoteModalOpen && (
        <div style={{ 
          position: 'fixed', 
          inset: 0, 
          background: 'rgba(15, 23, 42, 0.8)', 
          backdropFilter: 'blur(8px)',
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          zIndex: 1000,
          padding: '2rem'
        }}>
          <div style={{ 
            background: 'white', 
            width: '100%', 
            maxWidth: '600px', 
            borderRadius: '32px', 
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            overflow: 'hidden',
            animation: 'modalSlideUp 0.3s ease-out'
          }}>
            <div style={{ padding: '2rem 2.5rem', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc' }}>
              <div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '900', color: '#1e293b', margin: 0 }}>Novo Pedido de Obra</h3>
                <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '0.875rem' }}>Preencha os dados e entraremos em contato.</p>
              </div>
              <button onClick={() => setIsQuoteModalOpen(false)} style={{ background: '#f1f5f9', border: 'none', borderRadius: '12px', padding: '8px', cursor: 'pointer', color: '#64748b' }}>
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleCreateQuote} style={{ padding: '2.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.75rem' }}>Tipo de Serviço</label>
                  <select 
                    required
                    value={newQuote.serviceType}
                    onChange={(e) => setNewQuote({...newQuote, serviceType: e.target.value, additionalDetails: {}})}
                    style={{ width: '100%', padding: '14px 18px', borderRadius: '14px', border: '1px solid #e2e8f0', outline: 'none', background: '#f8fafc', fontSize: '1rem' }}
                  >
                    <option value="">Selecione o serviço...</option>
                    <option value="Construção">Construção Civil</option>
                    <option value="Manutenção">Manutenção de Edifício</option>
                    <option value="Consultoria">Consultoria</option>
                    <option value="Outros">Outros</option>
                  </select>
                </div>

                {/* Conditional Construction Details */}
                {newQuote.serviceType === 'Construção' && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.5rem' }}>Imóvel</label>
                      <select 
                        onChange={(e) => setNewQuote({...newQuote, additionalDetails: {...newQuote.additionalDetails, propertyType: e.target.value}})}
                        style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0' }}
                      >
                        <option value="">Selecione...</option>
                        <option value="Moradia">Moradia</option>
                        <option value="Prédio">Prédio / Apartamento</option>
                        <option value="Armazém">Armazém / Industrial</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.5rem' }}>Área (m²)</label>
                      <input 
                        type="number"
                        placeholder="Ex: 200"
                        onChange={(e) => setNewQuote({...newQuote, additionalDetails: {...newQuote.additionalDetails, area: e.target.value}})}
                        style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0' }}
                      />
                    </div>
                  </div>
                )}

                {/* Conditional Maintenance Details */}
                {newQuote.serviceType === 'Manutenção' && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.5rem' }}>Especialidade</label>
                      <select 
                        onChange={(e) => setNewQuote({...newQuote, additionalDetails: {...newQuote.additionalDetails, maintenanceType: e.target.value}})}
                        style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0' }}
                      >
                        <option value="">Selecione...</option>
                        <option value="Elétrica">Elétrica</option>
                        <option value="Canalização">Canalização</option>
                        <option value="Pintura">Pintura</option>
                        <option value="Geral">Manutenção Geral</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.5rem' }}>Urgência</label>
                      <select 
                        onChange={(e) => setNewQuote({...newQuote, additionalDetails: {...newQuote.additionalDetails, urgency: e.target.value}})}
                        style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0' }}
                      >
                        <option value="">Selecione...</option>
                        <option value="Baixa">Baixa</option>
                        <option value="Média">Média</option>
                        <option value="Crítica">Crítica</option>
                      </select>
                    </div>
                  </div>
                )}
                
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.75rem' }}>Estimativa de Orçamento</label>
                  <select 
                    value={newQuote.budgetRange}
                    onChange={(e) => setNewQuote({...newQuote, budgetRange: e.target.value})}
                    style={{ width: '100%', padding: '14px 18px', borderRadius: '14px', border: '1px solid #e2e8f0', outline: 'none', background: '#f8fafc', fontSize: '1rem' }}
                  >
                    <option value="">Selecione uma faixa...</option>
                    <option value="Sob Consulta">Sob Consulta</option>
                    <option value="Abaixo de 100k MT">Abaixo de 100.000 MT</option>
                    <option value="100k - 500k MT">100.000 MT - 500.000 MT</option>
                    <option value="Acima de 500k MT">Acima de 500.000 MT</option>
                  </select>
                </div>
                
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.75rem' }}>Descrição do Projeto</label>
                  <textarea 
                    required
                    placeholder="Descreva brevemente o que precisa..."
                    value={newQuote.description}
                    onChange={(e) => setNewQuote({...newQuote, description: e.target.value})}
                    style={{ width: '100%', padding: '14px 18px', borderRadius: '14px', border: '1px solid #e2e8f0', outline: 'none', background: '#f8fafc', minHeight: '120px', fontSize: '1rem' }}
                  />
                </div>
              </div>
              
              <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem' }}>
                <button 
                  type="button" 
                  onClick={() => setIsQuoteModalOpen(false)}
                  style={{ flex: 1, padding: '14px', borderRadius: '14px', border: '1px solid #e2e8f0', background: 'white', fontWeight: '700', color: '#64748b', cursor: 'pointer' }}
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  disabled={submitting}
                  style={{ 
                    flex: 1, 
                    padding: '14px', 
                    borderRadius: '14px', 
                    border: 'none', 
                    background: '#eb8923', 
                    fontWeight: '800', 
                    color: 'white', 
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(235, 137, 35, 0.3)'
                  }}
                >
                  {submitting ? 'A ENVIAR...' : 'ENVIAR SOLICITAÇÃO'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ACTIVE PROJECT FULL REPORT MODAL */}
      {selectedActiveProject && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100, padding: '2rem' }}>
          <div style={{ background: 'white', width: '100%', maxWidth: '1000px', height: '90vh', borderRadius: '40px', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
            <div style={{ padding: '2.5rem', background: '#f8fafc', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h2 style={{ margin: 0, fontSize: '2rem', fontWeight: '900', color: '#1e293b' }}>Relatório de Obra Detalhado</h2>
                <p style={{ margin: '4px 0 0', color: '#64748b', fontWeight: '500' }}>#{selectedActiveProject._id.slice(-8).toUpperCase()} | {selectedActiveProject.serviceType}</p>
              </div>
              <button onClick={() => setSelectedActiveProject(null)} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '15px', padding: '12px', cursor: 'pointer' }}>
                <X size={24} />
              </button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '3rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '3rem' }}>
                {/* Left Side: Progress & Photos */}
                <div>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '1.5rem' }}>Evolução Fotográfica</h4>
                  {selectedActiveProject.workPhotos?.length > 0 ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                      {selectedActiveProject.workPhotos.map((photo, i) => (
                        <img key={i} src={photo} alt="Foto de obra" style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '20px', border: '4px solid #f8fafc' }} />
                      ))}
                    </div>
                  ) : (
                    <div style={{ padding: '4rem', background: '#f8fafc', borderRadius: '24px', textAlign: 'center', color: '#94a3b8' }}>
                      Nenhuma foto de obra disponível no momento.
                    </div>
                  )}

                  <h4 style={{ fontSize: '1.25rem', fontWeight: '800', marginTop: '3rem', marginBottom: '1.5rem' }}>Lista de Materiais & Aquisições</h4>
                  {selectedActiveProject.materials?.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {selectedActiveProject.materials.map((mat, i) => (
                        <div key={i} style={{ padding: '1.25rem', background: '#f8fafc', borderRadius: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#eb8923' }}></div>
                            <span style={{ fontWeight: '700', color: '#1e293b' }}>{mat.name}</span>
                          </div>
                          <span style={{ color: '#64748b', fontSize: '0.875rem' }}>{new Date(mat.date).toLocaleDateString()}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p style={{ color: '#64748b' }}>A aguardar registo de materiais.</p>
                  )}
                </div>

                {/* Right Side: Finances & Deadlines */}
                <div>
                  <div style={{ padding: '1.5rem', background: '#003366', borderRadius: '24px', color: 'white', marginBottom: '2rem' }}>
                    <p style={{ margin: 0, opacity: 0.8, fontSize: '0.875rem' }}>ESTADO FINANCEIRO</p>
                    <h3 style={{ margin: '10px 0', fontSize: '2rem', fontWeight: '900' }}>
                      {((selectedActiveProject.payments?.reduce((acc, c) => acc + c.amount, 0) || 0)).toLocaleString()} MT
                    </h3>
                    <p style={{ margin: 0, fontSize: '0.875rem' }}>Pagos de um total de {(selectedActiveProject.totalBudget || 0).toLocaleString()} MT</p>
                  </div>

                  <h4 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '1rem' }}>Histórico de Parcelas</h4>
                  <div style={{ background: '#f8fafc', borderRadius: '24px', padding: '1.5rem' }}>
                    {selectedActiveProject.payments?.map((pay, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: i === selectedActiveProject.payments.length - 1 ? 'none' : '1px solid #e2e8f0' }}>
                        <span style={{ fontWeight: '600' }}>{pay.amount.toLocaleString()} MT</span>
                        <span style={{ color: '#10b981', fontWeight: '800' }}>✓ PAGO</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ marginTop: '2rem', padding: '1.5rem', border: '1px solid #e2e8f0', borderRadius: '24px' }}>
                    <p style={{ margin: 0, color: '#64748b', fontWeight: '700', fontSize: '0.75rem', textTransform: 'uppercase' }}>Notas da Administração</p>
                    <p style={{ margin: '10px 0 0', color: '#1e293b', lineHeight: 1.6 }}>{selectedActiveProject.adminNotes || "A sua obra está a decorrer conforme o planeado pela equipa da DOCA Moçambique."}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerDashboard;
