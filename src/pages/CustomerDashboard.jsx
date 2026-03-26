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
  MessageSquare
} from 'lucide-react';
import QuoteForm from '../components/QuoteForm';
import { motion, AnimatePresence } from 'framer-motion';

const API_URL = import.meta.env.VITE_API_BASE_URL || (import.meta.env.DEV ? 'http://localhost:5000' : '');

const CustomerDashboard = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedActiveProject, setSelectedActiveProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
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

  if (!user) return null;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc', fontFamily: 'Inter, sans-serif' }}>
      {/* Sidebar */}
      <aside style={{ 
        width: '280px', 
        background: '#ffffff', 
        borderRight: '1px solid #f1f5f9',
        padding: '2.5rem 1.8rem',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        height: '100vh',
        zIndex: 100,
        boxShadow: '4px 0 24px rgba(0,0,0,0.02)'
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

        {/* Support Section */}
        <div style={{ marginTop: '2.5rem', padding: '1.5rem', background: 'linear-gradient(135deg, #003366 0%, #001f3f 100%)', borderRadius: '24px', color: 'white' }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
              <MessageSquare size={18} color="#eb8923" />
              <p style={{ margin: 0, fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>Suporte Grátis</p>
           </div>
           <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: '500', opacity: 0.8, lineHeight: 1.4 }}>Precisa de ajuda com o seu projeto?</p>
           
           <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '1.5rem' }}>
              {[
                { label: 'Aguardar Retorno', msg: 'Saudações! Acabei de fazer o pedido do meu orçamento no portal e aguardo pelo vosso retorno para mais detalhes. Obrigado!' },
                { label: 'Estado da Obra', msg: 'Olá DOCA! Gostaria de receber uma atualização rápida sobre o estado atual da minha obra/projeto.' },
                { label: 'Dúvida Técnica', msg: 'Saudações, tenho uma dúvida técnica sobre o meu orçamento e gostaria de falar com um consultor.' }
              ].map((whatsapp, i) => (
                <motion.a
                  key={i}
                  whileHover={{ x: 4 }}
                  href={`https://wa.me/258842183204?text=${encodeURIComponent(whatsapp.msg)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ 
                    display: 'block', 
                    padding: '10px 14px', 
                    background: 'rgba(255,255,255,0.1)', 
                    borderRadius: '14px', 
                    color: 'white', 
                    fontSize: '0.7rem', 
                    textDecoration: 'none', 
                    fontWeight: '700',
                    border: '1px solid rgba(255,255,255,0.05)',
                    transition: '0.2s'
                  }}
                >
                  💬 {whatsapp.label}
                </motion.a>
              ))}
           </div>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ 
        marginLeft: '280px', 
        flex: 1, 
        padding: '3rem 5rem', 
        background: 'radial-gradient(at top left, #f8fafc 0%, #f1f5f9 100%)',
        minHeight: '100vh'
      }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <div style={{ 
              width: '80px', 
              height: '80px', 
              background: 'linear-gradient(135deg, #003366 0%, #001f3f 100%)', 
              borderRadius: '24px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: 'white',
              fontSize: '2rem',
              fontWeight: '900',
              boxShadow: '0 20px 25px -5px rgba(0, 51, 102, 0.2)'
            }}>
              {user.name.charAt(0)}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '0.9rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
                Painel do Cliente <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#cbd5e1' }}></div> Online
              </div>
              <h1 style={{ fontSize: '3rem', fontWeight: '900', color: '#0f172a', margin: 0, letterSpacing: '-2px', lineHeight: 1 }}>
                Olá, {user.name.split(' ')[0]}
              </h1>
            </div>
          </div>
          <motion.button 
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsQuoteModalOpen(true)}
            style={{ 
              padding: '18px 36px', 
              background: '#eb8923', 
              color: 'white', 
              border: 'none', 
              borderRadius: '24px', 
              fontWeight: '900', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px', 
              cursor: 'pointer',
              boxShadow: '0 20px 30px -10px rgba(235, 137, 35, 0.4)',
              fontSize: '1rem',
              letterSpacing: '0.5px'
            }}
          >
            SOLICITAR ORÇAMENTO <ArrowRight size={22} />
          </motion.button>
        </header>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2.5rem', marginBottom: '5rem' }}>
          {[
            { label: 'Pedidos Realizados', val: quotes.length, icon: FileText, color: '#003366' },
            { label: 'Obras em Análise', val: quotes.filter(q => q.status === 'Pendente' || q.status === 'Em Análise').length, icon: Clock, color: '#eb8923' },
            { label: 'Projectos Concluídos', val: quotes.filter(q => q.status === 'Concluído').length, icon: CheckCircle, color: '#10b981' }
          ].map((stat, i) => (
            <div key={i} style={{ 
              background: 'white', 
              padding: '2.5rem', 
              borderRadius: '32px', 
              border: '1px solid white', 
              boxShadow: '0 20px 25px -5px rgba(0,0,0,0.03)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{ 
                position: 'absolute', 
                top: '-20px', 
                right: '-20px', 
                opacity: 0.03 
              }}>
                <stat.icon size={120} />
              </div>
              <div style={{ color: stat.color, marginBottom: '1.5rem', background: `${stat.color}10`, width: '56px', height: '56px', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <stat.icon size={28} />
              </div>
              <p style={{ color: '#64748b', fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', margin: 0 }}>{stat.label}</p>
              <h3 style={{ fontSize: '3rem', fontWeight: '950', color: '#0f172a', margin: '10px 0 0 0', letterSpacing: '-1px' }}>{stat.val}</h3>
            </div>
          ))}
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
                
                return (
                  <div key={proj._id} style={{ background: 'white', borderRadius: '32px', border: '1px solid white', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                    <div style={{ height: '240px', background: proj.workPhotos?.length > 0 ? `url(${proj.workPhotos[proj.workPhotos.length - 1]})` : 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15, 23, 42, 0.95), transparent)' }}></div>
                      <div style={{ position: 'absolute', bottom: '25px', left: '25px', right: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                        <div>
                          <span style={{ background: 'rgba(235, 137, 35, 0.2)', color: '#eb8923', padding: '6px 14px', borderRadius: '100px', fontSize: '0.7rem', fontWeight: '900', textTransform: 'uppercase', border: '1px solid rgba(235, 137, 35, 0.3)', backdropFilter: 'blur(4px)' }}>{proj.status}</span>
                          <h3 style={{ color: 'white', margin: '12px 0 0', fontSize: '1.75rem', fontWeight: '900', letterSpacing: '-0.5px' }}>{proj.serviceType}</h3>
                        </div>
                        <div style={{ color: 'white', textAlign: 'right' }}>
                           <p style={{ margin: 0, fontSize: '0.7rem', opacity: 0.6, fontWeight: '700' }}>INVESTIMENTO TOTAL</p>
                           <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: '900' }}>{(proj.totalBudget || 0).toLocaleString()} MT</p>
                        </div>
                      </div>
                    </div>
                    
                    <div style={{ padding: '2.5rem' }}>
                      <div style={{ marginBottom: '2.5rem' }}>
                         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                           <h4 style={{ margin: 0, fontSize: '0.85rem', fontWeight: '800', color: '#0f172a', textTransform: 'uppercase' }}>Estado da Execução</h4>
                           <span style={{ fontSize: '1.25rem', fontWeight: '950', color: '#eb8923' }}>{proj.percentage || 0}%</span>
                         </div>
                         <div style={{ height: '8px', background: '#f1f5f9', borderRadius: '100px', overflow: 'hidden' }}>
                           <motion.div 
                             initial={{ width: 0 }}
                             animate={{ width: `${proj.percentage || 0}%` }}
                             transition={{ duration: 1, ease: 'easeOut' }}
                             style={{ height: '100%', background: 'linear-gradient(90deg, #eb8923, #f59e0b)', borderRadius: '100px' }}
                           />
                         </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2.5rem' }}>
                        <div style={{ padding: '1.25rem', background: '#f8fafc', borderRadius: '24px', border: '1px solid #f1f5f9' }}>
                           <div style={{ color: '#003366', opacity: 0.4, marginBottom: '8px' }}><DollarSign size={16} /></div>
                           <p style={{ margin: 0, fontSize: '0.7rem', fontWeight: '800', color: '#64748b' }}>TOTAL PAGO</p>
                           <p style={{ margin: '4px 0 0', fontSize: '1rem', fontWeight: '900' }}>{totalPaid.toLocaleString()} MT</p>
                        </div>
                        <div style={{ padding: '1.25rem', background: '#f8fafc', borderRadius: '24px', border: '1px solid #f1f5f9' }}>
                           <div style={{ color: '#003366', opacity: 0.4, marginBottom: '8px' }}><Calendar size={16} /></div>
                           <p style={{ margin: 0, fontSize: '0.7rem', fontWeight: '800', color: '#64748b' }}>PRÓXIMA ENTREGA</p>
                           <p style={{ margin: '4px 0 0', fontSize: '0.9rem', fontWeight: '900' }}>{proj.deadline ? new Date(proj.deadline).toLocaleDateString() : 'A definir'}</p>
                        </div>
                      </div>

                      <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedActiveProject(proj)}
                        style={{ width: '100%', background: '#0f172a', color: 'white', border: 'none', padding: '16px', borderRadius: '20px', fontWeight: '900', cursor: 'pointer', fontSize: '0.9rem', letterSpacing: '1px' }}
                      >
                        ABRIR MONITOR DE OBRA
                      </motion.button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* My Quotes List Table */}
        <div style={{ background: 'white', borderRadius: '40px', border: '1px solid white', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.04)', padding: '1rem' }}>
          <div style={{ padding: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: '900', color: '#0f172a', margin: 0, letterSpacing: '-0.5px' }}>Histórico de Solicitações</h2>
              <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '0.9rem', fontWeight: '500' }}>Acompanhe o estado de todos os seus pedidos de orçamento.</p>
            </div>
            
            <div style={{ position: 'relative' }}>
              <input 
                type="text" 
                placeholder="Pesquisar serviço..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ 
                  padding: '14px 24px', 
                  borderRadius: '18px', 
                  border: '1px solid #f1f5f9', 
                  fontSize: '0.9rem',
                  width: '300px',
                  outline: 'none',
                  background: '#f8fafc',
                  fontWeight: '600',
                  color: '#0f172a'
                }}
              />
            </div>
          </div>
          
          {loading ? (
            <div style={{ padding: '6rem', textAlign: 'center', color: '#64748b', fontWeight: '700' }}>
               <div style={{ marginBottom: '1rem' }}>⚙️</div>
               A carregar os seus dados premium...
            </div>
          ) : filteredQuotes.length === 0 ? (
            <div style={{ padding: '8rem', textAlign: 'center' }}>
              <div style={{ color: '#cbd5e1', marginBottom: '2rem' }}>
                <FileText size={80} style={{ margin: '0 auto' }} />
              </div>
              <h3 style={{ color: '#0f172a', fontSize: '1.5rem', fontWeight: '900', margin: 0 }}>Sem Pedidos Recentes</h3>
              <p style={{ color: '#64748b', fontSize: '1.1rem', fontWeight: '500', marginTop: '8px' }}>Parece que ainda não iniciou a sua jornada connosco.</p>
              <button 
                onClick={() => setIsQuoteModalOpen(true)} 
                style={{ background: '#003366', color: 'white', border: 'none', padding: '12px 28px', borderRadius: '14px', fontWeight: '800', cursor: 'pointer', marginTop: '2rem' }}
              >
                Solicitar Agora
              </button>
            </div>
          ) : (
            <div style={{ overflowX: 'auto', padding: '0 1rem 2rem 1rem' }}>
              <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 12px', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: 'transparent' }}>
                    <th style={{ padding: '1rem 2rem', color: '#94a3b8', fontSize: '0.7rem', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '1.5px' }}>Serviço / Referência</th>
                    <th style={{ padding: '1rem 2rem', color: '#94a3b8', fontSize: '0.7rem', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '1.5px' }}>Data de Registo</th>
                    <th style={{ padding: '1rem 2rem', color: '#94a3b8', fontSize: '0.7rem', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '1.5px' }}>Estado Atual</th>
                    <th style={{ padding: '1rem 2rem', color: '#94a3b8', fontSize: '0.7rem', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '1.5px', textAlign: 'right' }}>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredQuotes.map((quote) => (
                    <motion.tr 
                      key={quote._id} 
                      whileHover={{ scale: 1.005, y: -2 }}
                      style={{ background: '#f8fafc', borderRadius: '24px', transition: 'all 0.2s', cursor: 'pointer' }}
                    >
                      <td style={{ padding: '1.5rem 2rem', borderTopLeftRadius: '24px', borderBottomLeftRadius: '24px' }}>
                        <div style={{ fontWeight: '900', color: '#0f172a', fontSize: '1.1rem' }}>{quote.serviceType}</div>
                        <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', marginTop: '4px' }}>ID: DOCA-{quote._id.slice(-6).toUpperCase()}</div>
                      </td>
                      <td style={{ padding: '1.5rem 2rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#475569', fontSize: '0.95rem', fontWeight: '700' }}>
                          <Calendar size={16} color="#cbd5e1" /> {new Date(quote.createdAt).toLocaleDateString('pt-MZ')}
                        </div>
                      </td>
                      <td style={{ padding: '1.5rem 2rem' }}>
                        <div style={{ 
                          display: 'inline-flex', 
                          alignItems: 'center', 
                          gap: '8px', 
                          padding: '8px 18px', 
                          borderRadius: '100px', 
                          fontSize: '0.75rem', 
                          fontWeight: '900',
                          background: 'white',
                          color: getStatusColor(quote.status),
                          border: `1px solid ${getStatusColor(quote.status)}30`,
                          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.03)'
                        }}>
                          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: getStatusColor(quote.status) }}></div>
                          {quote.status.toUpperCase()}
                        </div>
                      </td>
                      <td style={{ padding: '1.5rem 2rem', textAlign: 'right', borderTopRightRadius: '24px', borderBottomRightRadius: '24px' }}>
                        <button 
                          onClick={() => alert(`Detalhes da Obra:\n\nServiço: ${quote.serviceType}\nStatus: ${quote.status}\n\nNota da Administração: ${quote.adminNotes || 'O seu pedido está a ser analisado.'}`)}
                          style={{ 
                            background: 'white', 
                            border: '1px solid #e2e8f0', 
                            color: '#0f172a', 
                            padding: '10px 20px', 
                            borderRadius: '14px', 
                            fontWeight: '800', 
                            fontSize: '0.85rem',
                            cursor: 'pointer',
                            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)'
                          }}
                        >
                          Detalhes
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* NEW QUOTE MODAL */}
      <AnimatePresence>
        {isQuoteModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ 
              position: 'fixed', 
              inset: 0, 
              background: 'rgba(15, 23, 42, 0.8)', 
              backdropFilter: 'blur(12px)',
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              zIndex: 1000,
              padding: '2rem'
            }}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              style={{ 
                background: 'white', 
                width: '100%', 
                maxWidth: '650px', 
                borderRadius: '40px', 
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                overflow: 'hidden',
                position: 'relative'
              }}
            >
              <button 
                onClick={() => setIsQuoteModalOpen(false)} 
                style={{ position: 'absolute', top: '24px', right: '24px', background: '#f1f5f9', border: 'none', borderRadius: '12px', padding: '10px', cursor: 'pointer', zIndex: 10, color: '#64748b' }}
              >
                <X size={20} />
              </button>
              <div style={{ padding: '10px' }}>
                <QuoteForm onComplete={() => {
                  setIsQuoteModalOpen(false);
                  fetchQuotes(user.id);
                }} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
                <div>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '1.5rem' }}>Evolução Fotográfica</h4>
                  {selectedActiveProject.workPhotos?.length > 0 ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                      {selectedActiveProject.workPhotos.map((photo, i) => (
                        <img key={i} src={photo} alt="Foto de obra" style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '20px', border: '4px solid #f8fafc' }} />
                      ))}
                    </div>
                  ) : (
                    <div style={{ padding: '4rem', background: '#f8fafc', borderRadius: '24px', textAlign: 'center', color: '#94a3b8' }}>Nenhuma foto de obra disponível.</div>
                  )}

                  <h4 style={{ fontSize: '1.25rem', fontWeight: '800', marginTop: '3rem', marginBottom: '1.5rem' }}>Lista de Materiais</h4>
                  {selectedActiveProject.materials?.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {selectedActiveProject.materials.map((mat, i) => (
                        <div key={i} style={{ padding: '1.25rem', background: '#f8fafc', borderRadius: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontWeight: '700', color: '#1e293b' }}>{mat.name}</span>
                          <span style={{ color: '#64748b', fontSize: '0.875rem' }}>{new Date(mat.date).toLocaleDateString()}</span>
                        </div>
                      ))}
                    </div>
                  ) : <p style={{ color: '#64748b' }}>A aguardar registo de materiais.</p>}
                </div>

                <div>
                  <div style={{ padding: '1.5rem', background: '#003366', borderRadius: '24px', color: 'white', marginBottom: '2rem' }}>
                    <p style={{ margin: 0, opacity: 0.8, fontSize: '0.875rem' }}>ESTADO FINANCEIRO</p>
                    <h3 style={{ margin: '10px 0', fontSize: '2rem', fontWeight: '900' }}>
                      {((selectedActiveProject.payments?.reduce((acc, c) => acc + c.amount, 0) || 0)).toLocaleString()} MT
                    </h3>
                  </div>

                  <h4 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '1rem' }}>Parcelas Pagas</h4>
                  <div style={{ background: '#f8fafc', borderRadius: '24px', padding: '1.5rem' }}>
                    {selectedActiveProject.payments?.map((pay, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: i === selectedActiveProject.payments.length - 1 ? 'none' : '1px solid #e2e8f0' }}>
                        <span style={{ fontWeight: '600' }}>{pay.amount.toLocaleString()} MT</span>
                        <span style={{ color: '#10b981', fontWeight: '800' }}>✓ PAGO</span>
                      </div>
                    ))}
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
