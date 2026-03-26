import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, Loader2, CheckCircle } from 'lucide-react';
import QuoteForm from './QuoteForm';

const Contact = () => {
  return (
    <section id="contacto" style={{ backgroundColor: 'white', padding: '100px 0' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px', alignItems: 'center' }}>
          
          {/* Contact Info Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 style={{ fontSize: '3rem', color: 'var(--primary-blue)', marginBottom: '30px', fontWeight: '800', lineHeight: '1.1' }}>
              Pronto para <span style={{ color: 'var(--accent-yellow-dark)' }}>Construir?</span>
            </h2>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '40px', maxWidth: '500px' }}>
              Solicite um orçamento personalizado agora mesmo. Escolha o processo oficial ou fale connosco diretamente pelo WhatsApp.
            </p>

            <ul style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                <div style={{ backgroundColor: '#eb892315', color: '#eb8923', width: '50px', height: '50px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Phone size={24} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', color: '#1e293b', marginBottom: '5px', fontWeight: '700' }}>Telefone</h4>
                  <p style={{ fontSize: '1.1rem', color: '#64748b' }}>+258 848580244</p>
                </div>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                <div style={{ backgroundColor: '#eb892315', color: '#eb8923', width: '50px', height: '50px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Mail size={24} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', color: '#1e293b', marginBottom: '5px', fontWeight: '700' }}>E-mail</h4>
                  <p style={{ fontSize: '1.1rem', color: '#64748b' }}>geral@docacm.com</p>
                </div>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                <div style={{ backgroundColor: '#eb892315', color: '#eb8923', width: '50px', height: '50px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', color: '#1e293b', marginBottom: '5px', fontWeight: '700' }}>Sede Social</h4>
                  <p style={{ fontSize: '1.1rem', color: '#64748b' }}>Rua Renata Sadimba, N°139, Malhangalene B</p>
                </div>
              </li>
            </ul>
          </motion.div>

          {/* Form Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <QuoteForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
