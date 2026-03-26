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
  ArrowRight
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_BASE_URL || (import.meta.env.DEV ? 'http://localhost:5000' : '');

const CustomerDashboard = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
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
            <li style={{ 
              color: '#64748b', 
              padding: '12px 16px', 
              borderRadius: '12px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px',
              cursor: 'pointer',
              fontWeight: '500',
              transition: 'all 0.2s'
            }}>
              <MessageCircle size={20} /> Suporte
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
      <main style={{ marginLeft: '280px', flex: 1, padding: '2.5rem 4rem' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
          <div>
            <h1 style={{ fontSize: '2.25rem', fontWeight: '800', color: '#1e293b', margin: 0, letterSpacing: '-1px' }}>
              Olá, {user.name.split(' ')[0]} 👋
            </h1>
            <p style={{ color: '#64748b', marginTop: '8px', fontSize: '1.125rem' }}>
              Bem-vindo ao seu painel de gerenciamento de obras e pedidos.
            </p>
          </div>
          <button 
            onClick={() => navigate('/#contacto')}
            style={{ 
              padding: '14px 28px', 
              background: '#eb8923', 
              color: 'white', 
              border: 'none', 
              borderRadius: '16px', 
              fontWeight: '700', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px', 
              cursor: 'pointer',
              boxShadow: '0 10px 15px -3px rgba(235, 137, 35, 0.3)'
            }}
          >
            Novo Orçamento <ArrowRight size={20} />
          </button>
        </header>

        {/* Info Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '24px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ color: '#3b82f6', marginBottom: '1rem', background: 'rgba(59, 130, 246, 0.1)', width: '40px', height: '40px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FileText size={20} />
            </div>
            <p style={{ color: '#64748b', fontSize: '0.875rem', fontWeight: '600', margin: 0 }}>Total de Pedidos</p>
            <h3 style={{ fontSize: '2rem', fontWeight: '800', color: '#1e293b', margin: '4px 0 0 0' }}>{quotes.length}</h3>
          </div>
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '24px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ color: '#f59e0b', marginBottom: '1rem', background: 'rgba(245, 158, 11, 0.1)', width: '40px', height: '40px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Clock size={20} />
            </div>
            <p style={{ color: '#64748b', fontSize: '0.875rem', fontWeight: '600', margin: 0 }}>Em Análise</p>
            <h3 style={{ fontSize: '2rem', fontWeight: '800', color: '#1e293b', margin: '4px 0 0 0' }}>{quotes.filter(q => q.status === 'Pendente' || q.status === 'Em Análise').length}</h3>
          </div>
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '24px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ color: '#10b981', marginBottom: '1rem', background: 'rgba(16, 185, 129, 0.1)', width: '40px', height: '40px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckCircle size={20} />
            </div>
            <p style={{ color: '#64748b', fontSize: '0.875rem', fontWeight: '600', margin: 0 }}>Concluídos</p>
            <h3 style={{ fontSize: '2rem', fontWeight: '800', color: '#1e293b', margin: '4px 0 0 0' }}>{quotes.filter(q => q.status === 'Concluído').length}</h3>
          </div>
        </div>

        {/* My Quotes List */}
        <div style={{ background: 'white', borderRadius: '24px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1e293b', margin: 0 }}>Histórico de Orçamentos</h2>
          </div>
          
          {loading ? (
            <div style={{ padding: '4rem', textAlign: 'center', color: '#64748b' }}>Carregando seus pedidos...</div>
          ) : quotes.length === 0 ? (
            <div style={{ padding: '6rem', textAlign: 'center' }}>
              <div style={{ color: '#cbd5e1', marginBottom: '1.5rem' }}>
                <FileText size={48} style={{ margin: '0 auto' }} />
              </div>
              <p style={{ color: '#64748b', fontSize: '1.125rem' }}>Ainda não fez nenhum pedido de orçamento.</p>
              <button onClick={() => navigate('/#contacto')} style={{ color: '#003366', fontWeight: '700', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem' }}>Fazer meu primeiro orçamento →</button>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '1px solid #f1f5f9' }}>
                    <th style={{ padding: '1.25rem 2rem', color: '#64748b', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase' }}>Serviço</th>
                    <th style={{ padding: '1.25rem 2rem', color: '#64748b', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase' }}>Data</th>
                    <th style={{ padding: '1.25rem 2rem', color: '#64748b', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase' }}>Status</th>
                    <th style={{ padding: '1.25rem 2rem', color: '#64748b', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', textAlign: 'right' }}>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {quotes.map((quote) => (
                    <tr key={quote._id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.2s' }}>
                      <td style={{ padding: '1.25rem 2rem' }}>
                        <p style={{ fontWeight: '700', color: '#1e293b', margin: 0 }}>{quote.serviceType}</p>
                        <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: 0 }}>Ref: {quote._id.slice(-8).toUpperCase()}</p>
                      </td>
                      <td style={{ padding: '1.25rem 2rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#475569', fontSize: '0.875rem' }}>
                          <Calendar size={14} /> {new Date(quote.createdAt).toLocaleDateString('pt-MZ')}
                        </div>
                      </td>
                      <td style={{ padding: '1.25rem 2rem' }}>
                        <div style={{ 
                          display: 'inline-flex', 
                          alignItems: 'center', 
                          gap: '6px', 
                          padding: '6px 14px', 
                          borderRadius: '100px', 
                          fontSize: '0.75rem', 
                          fontWeight: '700',
                          background: `${getStatusColor(quote.status)}10`,
                          color: getStatusColor(quote.status)
                        }}>
                          {getStatusIcon(quote.status)}
                          {quote.status}
                        </div>
                      </td>
                      <td style={{ padding: '1.25rem 2rem', textAlign: 'right' }}>
                        <button 
                          onClick={() => alert(`Detalhes do Orçamento:\n\nServiço: ${quote.serviceType}\nStatus: ${quote.status}\nNotas: ${quote.adminNotes || 'Nenhuma nota disponível.'}`)}
                          style={{ 
                            background: '#f1f5f9', 
                            border: 'none', 
                            color: '#1e293b', 
                            padding: '8px 16px', 
                            borderRadius: '10px', 
                            fontWeight: '600', 
                            fontSize: '0.875rem',
                            cursor: 'pointer'
                          }}
                        >
                          Ver Detalhes
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
    </div>
  );
};

export default CustomerDashboard;
