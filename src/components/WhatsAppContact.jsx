import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const WhatsAppContact = ({ variant = 'floating' }) => {
  const [showWpOptions, setShowWpOptions] = useState(false);
  const [selectedWpMsg, setSelectedWpMsg] = useState(null);

  const options = [
    { icon: '⏳', label: 'Aguardo Retorno', msg: 'Saudações! Acabei de fazer o pedido do meu orçamento no portal e aguardo pelo vosso retorno. Obrigado!' },
    { icon: '🏗️', label: 'Update de Obra', msg: 'Olá! Gostaria de receber uma atualização rápida sobre o estado atual do meu projeto.' },
    { icon: '🤔', label: 'Dúvidas e Suporte', msg: 'Bom dia! Gostaria de esclarecer uma dúvida sobre os serviços da DOCA.' },
    { icon: '📅', label: 'Agendar Reunião', msg: 'Olá! Seria possível agendar uma reunião para discutirmos um novo projeto?' },
    { icon: '🧾', label: 'Faturação / Recibos', msg: 'Saudações! Entro em contacto para tratar de questões relacionadas a pagamentos e faturas.' },
    { icon: '🆕', label: 'Nova Obra Extra', msg: 'Olá! Tenho um novo serviço extra para solicitar que não estava no orçamento inicial.' },
    { icon: '🤝', label: 'Parcerias', msg: 'Olá! Tenho interesse em explorar uma parceria com a DOCA Moçambique.' },
    { icon: '💼', label: 'Trabalhar convosco', msg: 'Bom dia! Gostaria de saber se têm vagas disponíveis para colaborar na área de construção/gestão.' }
  ];

  const content = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {options.map((whatsapp, i) => (
        <div key={i} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '12px', border: selectedWpMsg === i ? '1px solid #FFCC00' : '1px solid rgba(255,255,255,0.1)', overflow: 'hidden', transition: 'all 0.2s' }}>
          <button
            onClick={() => setSelectedWpMsg(selectedWpMsg === i ? null : i)}
            style={{
              width: '100%',
              padding: '12px',
              background: 'transparent',
              border: 'none',
              color: 'white',
              textAlign: 'left',
              fontSize: '0.8rem',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            {whatsapp.icon} {whatsapp.label}
          </button>
          
          <AnimatePresence>
            {selectedWpMsg === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                style={{ overflow: 'hidden' }}
              >
                <div style={{ padding: '0 12px 12px 12px' }}>
                  <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', fontStyle: 'italic', marginBottom: '12px', lineHeight: '1.4', background: 'rgba(0,0,0,0.2)', padding: '10px', borderRadius: '8px' }}>
                    "{whatsapp.msg}"
                  </p>
                  <a
                    href={`https://wa.me/258848580244?text=${encodeURIComponent(whatsapp.msg)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      padding: '10px',
                      background: '#25D366',
                      color: 'white',
                      textDecoration: 'none',
                      borderRadius: '8px',
                      fontWeight: '800',
                      fontSize: '0.7rem'
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.488-1.761-1.663-2.06-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.575-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                    </svg>
                    ENVIAR MENSAGEM
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );

  if (variant === 'sidebar') {
    return (
      <div style={{ marginBottom: '2rem', padding: '1.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)' }}>
        <button 
          onClick={() => setShowWpOptions(!showWpOptions)}
          style={{ 
            width: '100%', 
            padding: '12px', 
            background: '#FFCC00', 
            color: 'white', 
            border: 'none', 
            borderRadius: '14px', 
            fontWeight: '900', 
            fontSize: '0.8rem', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: '10px', 
            cursor: 'pointer',
            boxShadow: '0 10px 15px -3px rgba(235, 137, 35, 0.2)'
          }}
        >
          <MessageSquare size={18} /> {showWpOptions ? 'FECHAR' : 'CONTACTAR VENDAS'}
        </button>
        
        <AnimatePresence>
          {showWpOptions && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{ paddingTop: '1.25rem' }}>
                {content}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Floating variant for Landing Page
  return (
    <div style={{ position: 'fixed', bottom: '30px', right: '30px', zIndex: 1000, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '15px' }}>
      <AnimatePresence>
        {showWpOptions && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            style={{ 
              background: '#000000', 
              padding: '1.5rem', 
              borderRadius: '24px', 
              border: '1px solid rgba(255,255,255,0.1)',
              width: '320px',
              maxHeight: '450px',
              overflowY: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', color: 'white' }}>
              <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: '800' }}>Fale Connosco <span style={{ color: '#FFCC00' }}>.</span></h4>
              <button onClick={() => setShowWpOptions(false)} style={{ color: 'rgba(255,255,255,0.5)', background: 'transparent', border: 'none', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>
            {content}
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.button
        onClick={() => setShowWpOptions(!showWpOptions)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: showWpOptions ? '#000000' : '#FFCC00',
          color: 'white',
          border: showWpOptions ? '2px solid rgba(255,255,255,0.1)' : 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 10px 15px -3px rgba(0,0,0,0.3)',
          transition: 'background 0.3s'
        }}
      >
        {showWpOptions ? <X size={28} /> : <MessageSquare size={28} />}
      </motion.button>
    </div>
  );
};

export default WhatsAppContact;
