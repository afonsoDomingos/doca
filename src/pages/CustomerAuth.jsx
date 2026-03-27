import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LogIn, 
  UserPlus, 
  User, 
  Mail, 
  Lock, 
  Phone, 
  ArrowRight, 
  AlertCircle,
  CheckCircle,
  ArrowLeft
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_BASE_URL || (import.meta.env.DEV ? 'http://localhost:5000' : '');

const CustomerAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      setLoading(false);
      return;
    }

    const endpoint = isLogin ? '/api/auth/login' : '/api/register';
    const fullUrl = `${API_URL}${endpoint}`;
    const payload = isLogin 
      ? { email: formData.email, password: formData.password }
      : { name: formData.name, email: formData.email, password: formData.password, phone: formData.phone };

    console.group(`🔐 DOCA Auth — ${isLogin ? 'LOGIN' : 'REGISTO'}`);
    console.log('📡 URL:', fullUrl);
    console.log('📦 Payload (sem senha):', { ...payload, password: '***' });

    try {
      const response = await fetch(fullUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      console.log('📬 Status HTTP:', response.status, response.statusText);
      console.log('📋 Content-Type:', response.headers.get('content-type'));

      const contentType = response.headers.get('content-type');
      let data = {};

      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
        console.log('✅ Resposta JSON:', data);
      } else {
        const textError = await response.text();
        console.error('❌ Servidor devolveu resposta não-JSON:', textError);
        console.error('🔗 Verifique se a rota existe em: api/index.js');
        setError(`Erro do Servidor (Código ${response.status}). Verifique o console.`);
        setLoading(false);
        console.groupEnd();
        return;
      }

      if (response.ok) {
        console.log('🎉 Autenticação bem-sucedida! Role:', data.role);
        if (isLogin) {
          if (data.role === 'admin') {
            localStorage.setItem('adminAuthenticated', 'true');
            navigate('/admin/dashboard');
          } else {
            localStorage.setItem('customerUser', JSON.stringify(data.user));
            navigate('/portal/dashboard');
          }
        } else {
          setSuccess('Cadastro realizado com sucesso! Pode fazer login.');
          setIsLogin(true);
          setFormData({ ...formData, password: '', confirmPassword: '' });
        }
      } else {
        console.warn('⚠️ Autenticação falhou. Resposta do servidor:', data);
        setError(data.error || 'E-mail ou senha incorretos');
      }
    } catch (err) {
      console.error('🚨 Erro de rede / fetch:', err.message, err);
      setError('Erro de conexão. Verifique o console para detalhes.');
    } finally {
      setLoading(false);
      console.groupEnd();
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: '#f8fafc', fontFamily: 'Inter, sans-serif' }}>
      {/* Left Side - Visual */}
      <div style={{ 
        flex: 1, 
        background: 'linear-gradient(135deg, #003366 0%, #001e40 100%)', 
        display: 'none', 
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '6rem',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }} className="auth-visual">
        <div style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', opacity: '0.1', backgroundImage: 'url("/bannerdoca.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        
        <Link to="/" style={{ color: 'white', textDecoration: 'none', position: 'absolute', top: '40px', left: '40px', display: 'flex', alignItems: 'center', gap: '8px', zIndex: 10 }}>
          <ArrowLeft size={20} /> Voltar para o Site
        </Link>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ position: 'relative', zIndex: 10 }}
        >
          <h1 style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '1.5rem', lineHeight: '1.1', letterSpacing: '-1px' }}>
            Portal do Cliente <br /> <span style={{ color: '#FFCC00' }}>DOCA MOZAMBIQUE</span>
          </h1>
          <p style={{ fontSize: '1.25rem', opacity: '0.8', lineHeight: '1.6', maxWidth: '500px' }}>
            Aceda para gerenciar os seus orçamentos, acompanhar o estado das suas obras e comunicar-se diretamente com a nossa equipa técnica.
          </p>
          
          <div style={{ marginTop: '4rem', display: 'flex', gap: '30px' }}>
            <div style={{ opacity: '0.6', textAlign: 'center' }}>
              <h4 style={{ fontSize: '1.5rem', margin: '0' }}>100%</h4>
              <p style={{ margin: '0', fontSize: '0.875rem' }}>Digital</p>
            </div>
            <div style={{ opacity: '0.6', textAlign: 'center' }}>
              <h4 style={{ fontSize: '1.5rem', margin: '0' }}>24/7</h4>
              <p style={{ margin: '0', fontSize: '0.875rem' }}>Suporte</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Side - Form */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ width: '100%', maxWidth: '480px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{ width: '64px', height: '64px', background: '#003366', borderRadius: '16px', margin: '0 auto 1.5rem auto', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 16px -4px rgba(0, 51, 102, 0.4)' }}>
              {isLogin ? <LogIn size={32} color="white" /> : <UserPlus size={32} color="white" />}
            </div>
            <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#1e293b', marginBottom: '0.5rem', letterSpacing: '-0.5px' }}>
              {isLogin ? 'Bem-vindo de volta' : 'Crie a sua conta'}
            </h2>
            <p style={{ color: '#64748b', fontSize: '1rem' }}>
              {isLogin ? 'Introduza os seus dados para aceder ao portal' : 'Comece a gerenciar os seus projetos agora'}
            </p>
          </div>

          <AnimatePresence mode="wait">
            <motion.form
              key={isLogin ? 'login' : 'register'}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onSubmit={handleAuth}
              style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
            >
              {error && (
                <div style={{ background: '#fef2f2', border: '1px solid #fee2e2', padding: '12px 16px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '10px', color: '#ef4444', fontSize: '0.875rem' }}>
                  <AlertCircle size={18} /> {error}
                </div>
              )}
              
              {success && (
                <div style={{ background: '#f0fdf4', border: '1px solid #dcfce7', padding: '12px 16px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '10px', color: '#10b981', fontSize: '0.875rem' }}>
                  <CheckCircle size={18} /> {success}
                </div>
              )}

              {!isLogin && (
                <div style={{ position: 'relative' }}>
                  <User size={20} color="#94a3b8" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Nome Completo"
                    value={formData.name}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '14px 14px 14px 48px', border: '1px solid #e2e8f0', borderRadius: '12px', fontSize: '1rem', outline: 'none', transition: 'border-color 0.2s', background: 'white' }}
                  />
                </div>
              )}

              <div style={{ position: 'relative' }}>
                <Mail size={20} color="#94a3b8" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="E-mail Corporativo ou Pessoal"
                  value={formData.email}
                  onChange={handleInputChange}
                  style={{ width: '100%', padding: '14px 14px 14px 48px', border: '1px solid #e2e8f0', borderRadius: '12px', fontSize: '1rem', outline: 'none', transition: 'border-color 0.2s', background: 'white' }}
                />
              </div>

              {!isLogin && (
                <div style={{ position: 'relative' }}>
                  <Phone size={20} color="#94a3b8" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Telefone / WhatsApp"
                    value={formData.phone}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '14px 14px 14px 48px', border: '1px solid #e2e8f0', borderRadius: '12px', fontSize: '1rem', outline: 'none', transition: 'border-color 0.2s', background: 'white' }}
                  />
                </div>
              )}

              <div style={{ position: 'relative' }}>
                <Lock size={20} color="#94a3b8" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="Senha"
                  value={formData.password}
                  onChange={handleInputChange}
                  style={{ width: '100%', padding: '14px 14px 14px 48px', border: '1px solid #e2e8f0', borderRadius: '12px', fontSize: '1rem', outline: 'none', transition: 'border-color 0.2s', background: 'white' }}
                />
              </div>

              {!isLogin && (
                <div style={{ position: 'relative' }}>
                  <Lock size={20} color="#94a3b8" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="password"
                    name="confirmPassword"
                    required
                    placeholder="Confirmar Senha"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '14px 14px 14px 48px', border: '1px solid #e2e8f0', borderRadius: '12px', fontSize: '1rem', outline: 'none', transition: 'border-color 0.2s', background: 'white' }}
                  />
                </div>
              )}

              {isLogin && (
                <div style={{ textAlign: 'right' }}>
                  <a href="#" style={{ fontSize: '0.875rem', color: '#003366', fontWeight: '600', textDecoration: 'none' }}>Esqueceu a senha?</a>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                style={{ 
                  width: '100%', 
                  padding: '14px', 
                  background: '#003366', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '12px', 
                  fontWeight: '700', 
                  fontSize: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  boxShadow: '0 10px 15px -3px rgba(0, 51, 102, 0.3)',
                  transition: 'opacity 0.2s'
                }}
              >
                {loading ? 'Processando...' : isLogin ? 'Entrar no Portal' : 'Criar minha conta'} 
                {!loading && <ArrowRight size={20} />}
              </button>

              <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
                  {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}
                  <button
                    type="button"
                    onClick={() => setIsLogin(!isLogin)}
                    style={{ background: 'none', border: 'none', color: '#003366', fontWeight: '800', cursor: 'pointer', marginLeft: '8px' }}
                  >
                    {isLogin ? 'Cadastre-se' : 'Faça login'}
                  </button>
                </p>
              </div>
            </motion.form>
          </AnimatePresence>

          {/* Footer inside right side */}
          <div style={{ marginTop: '4rem', textAlign: 'center' }}>
            <Link to="/" style={{ color: '#94a3b8', fontSize: '0.75rem', textDecoration: 'none', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>
              DOCA MOZAMBIQUE
            </Link>
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        @media (min-width: 992px) {
          .auth-visual { display: flex !important; }
        }
      `}} />
    </div>
  );
};

export default CustomerAuth;
