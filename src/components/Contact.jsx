import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, Loader2, CheckCircle } from 'lucide-react';

const Contact = () => {
  const [formState, setFormState] = useState('idle'); // idle, loading, success

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState('loading');
    // Simulate API call
    setTimeout(() => {
      setFormState('success');
    }, 2000);
  };

  return (
    <section id="contacto" style={{ backgroundColor: 'white' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px' }}>
          
          {/* Contact Info Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 style={{ fontSize: '2.5rem', color: 'var(--primary-blue)', marginBottom: '30px' }}>
              Entre em <span style={{ color: 'var(--accent-yellow-dark)' }}>Contacto</span> Connosco
            </h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '40px' }}>
              Estamos prontos para ouvir sobre o seu próximo grande projeto. Nossa equipa de especialistas está à sua disposição para orçamentos e consultoria.
            </p>

            <ul style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                <div style={{ backgroundColor: 'var(--accent-yellow)', color: 'var(--primary-blue)', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Phone size={24} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.2rem', color: 'var(--primary-blue)', marginBottom: '5px' }}>Telefone</h4>
                  <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>+258 829580244</p>
                  <p style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>Segunda a Sexta, 8h - 17h</p>
                </div>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                <div style={{ backgroundColor: 'var(--accent-yellow)', color: 'var(--primary-blue)', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Mail size={24} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.2rem', color: 'var(--primary-blue)', marginBottom: '5px' }}>E-mail</h4>
                  <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>geral@docacm.com</p>
                  <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>comercial@docacm.com</p>
                </div>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                <div style={{ backgroundColor: 'var(--accent-yellow)', color: 'var(--primary-blue)', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.2rem', color: 'var(--primary-blue)', marginBottom: '5px' }}>Sede Social</h4>
                  <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>Rua Renata Sadimba, N°139</p>
                  <p style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>Bloco 1, 1° Andar, Flat 4, Malhangalene B</p>
                </div>
              </li>
            </ul>
          </motion.div>

          {/* Form Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{
              backgroundColor: 'var(--bg-light)',
              padding: '40px',
              borderRadius: '24px',
              boxShadow: 'var(--shadow-lg)',
              border: '1px solid #E2E8F0'
            }}
          >
            {formState === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ textAlign: 'center', padding: '40px 0' }}
              >
                <div style={{ color: '#10B981', marginBottom: '20px' }}>
                  <CheckCircle size={80} style={{ margin: '0 auto' }} />
                </div>
                <h3 style={{ fontSize: '1.8rem', color: 'var(--primary-blue)', marginBottom: '15px' }}>Mensagem Enviada!</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>Obrigado pelo contacto. Nossa equipa responderá em breve.</p>
                <button 
                  onClick={() => setFormState('idle')} 
                  className="btn btn-primary"
                  style={{ padding: '12px 30px' }}
                >
                  Enviar Outra Mensagem
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '25px' }}>
                  <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: 'var(--primary-blue)' }}>Nome Completo</label>
                  <input 
                    type="text" 
                    placeholder="Seu nome aqui" 
                    required
                    style={{ width: '100%', padding: '15px', borderRadius: '12px', border: '2px solid #CBD5E1', outline: 'none', transition: '0.3s' }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--primary-blue)'}
                    onBlur={(e) => e.target.style.borderColor = '#CBD5E1'}
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '25px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: 'var(--primary-blue)' }}>Email</label>
                    <input 
                      type="email" 
                      placeholder="seu@email.com" 
                      required
                      style={{ width: '100%', padding: '15px', borderRadius: '12px', border: '2px solid #CBD5E1', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: 'var(--primary-blue)' }}>Telefone</label>
                    <input 
                      type="tel" 
                      placeholder="+258 ..." 
                      required
                      style={{ width: '100%', padding: '15px', borderRadius: '12px', border: '2px solid #CBD5E1', outline: 'none' }}
                    />
                  </div>
                </div>
                <div style={{ marginBottom: '30px' }}>
                  <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: 'var(--primary-blue)' }}>Mensagem</label>
                  <textarea 
                    rows="5" 
                    placeholder="Como podemos ajudar?" 
                    required
                    style={{ width: '100%', padding: '15px', borderRadius: '12px', border: '2px solid #CBD5E1', outline: 'none', resize: 'none' }}
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  disabled={formState === 'loading'}
                  className="btn btn-primary" 
                  style={{ width: '100%', padding: '18px', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
                >
                  {formState === 'loading' ? (
                    <><Loader2 className="animate-spin" /> Processando...</>
                  ) : (
                    <><Send size={20} /> Solicitar Orçamento Gratuito</>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin { animation: spin 1s linear infinite; }
      `}} />
    </section>
  );
};

export default Contact;
