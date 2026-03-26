import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  Wrench, 
  Users, 
  ArrowRight, 
  ArrowLeft, 
  Send, 
  MessageCircle,
  CheckCircle2,
  Calendar,
  DollarSign,
  User,
  Mail,
  Phone
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_BASE_URL || (import.meta.env.DEV ? 'http://localhost:5000' : '');

const QuoteForm = () => {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [method, setMethod] = useState(null); // 'platform' or 'whatsapp'
  const [user, setUser] = useState(null);

  const [formData, setFormData] = useState({
    clientName: '',
    email: '',
    phone: '',
    serviceType: '',
    budgetRange: '',
    description: '',
    additionalDetails: {}
  });

  useEffect(() => {
    const userData = localStorage.getItem('customerUser');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setFormData(prev => ({
        ...prev,
        clientName: parsedUser.name || '',
        email: parsedUser.email || '',
        phone: parsedUser.phone || ''
      }));
    }
  }, []);

  const services = [
    { id: 'Construção', icon: Building2, label: 'Construção Civil' },
    { id: 'Manutenção', icon: Wrench, label: 'Manutenção de Edifícios' },
    { id: 'Consultoria', icon: Users, label: 'Consultoria de Projetos' },
    { id: 'Outros', icon: Send, label: 'Outros Serviços' }
  ];

  const budgets = [
    'Sob Consulta',
    'Abaixo de 50.000 MT',
    '50.000 MT - 200.000 MT',
    '200.000 MT - 1.000.000 MT',
    'Acima de 1.000.000 MT'
  ];

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleServiceSelect = (serviceId) => {
    setFormData({ 
      ...formData, 
      serviceType: serviceId,
      additionalDetails: {} // Limpar detalhes se mudar o serviço
    });
    nextStep();
  };

  const updateAdditionalDetail = (key, value) => {
    setFormData(prev => ({
      ...prev,
      additionalDetails: {
        ...prev.additionalDetails,
        [key]: value
      }
    }));
  };

  const handleSubmitPlatform = async () => {
    try {
      const payload = { ...formData, userId: user ? user.id : null };
      const response = await fetch(`${API_URL}/api/quotes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        setSubmitted(true);
      }
    } catch (err) {
      console.error('Error submitting quote:', err);
    }
  };

  const handleSubmitWhatsApp = () => {
    const text = `Olá DOCA Construção! Gostaria de pedir um orçamento.%0A%0A*Detalhes do Pedido:*%0A- *Nome:* ${formData.clientName}%0A- *Serviço:* ${formData.serviceType}%0A- *Orçamento:* ${formData.budgetRange}%0A- *Descrição:* ${formData.description}%0A%0A*Contato:*%0A- *E-mail:* ${formData.email}%0A- *Telefone:* ${formData.phone}`;
    window.open(`https://wa.me/258840000000?text=${text}`, '_blank');
    setSubmitted(true);
  };

  const steps = [
    // Step 0: Method Selection
    <div key="step0" className="quote-step">
      <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem', textAlign: 'center' }}>Como deseja solicitar seu orçamento?</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <button 
          onClick={() => { setMethod('platform'); nextStep(); }}
          style={{ 
            padding: '2rem', 
            borderRadius: '20px', 
            border: '2px solid #f1f5f9', 
            background: 'white',
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem'
          }}
          className="hover-card"
        >
          <div style={{ background: '#eb892315', padding: '1rem', borderRadius: '50%', color: '#eb8923' }}>
            <Calendar size={32} />
          </div>
          <span style={{ fontWeight: '600', color: '#1e293b' }}>Pela Plataforma</span>
          <p style={{ fontSize: '0.8rem', color: '#64748b' }}>Processo guiado e formal</p>
        </button>
        <button 
          onClick={() => { setMethod('whatsapp'); nextStep(); }}
          style={{ 
            padding: '2rem', 
            borderRadius: '20px', 
            border: '2px solid #f1f5f9', 
            background: 'white',
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem'
          }}
          className="hover-card"
        >
          <div style={{ background: '#25D36615', padding: '1rem', borderRadius: '50%', color: '#25D366' }}>
            <MessageCircle size={32} />
          </div>
          <span style={{ fontWeight: '600', color: '#1e293b' }}>Pelo WhatsApp</span>
          <p style={{ fontSize: '0.8rem', color: '#64748b' }}>Atendimento instantâneo</p>
        </button>
      </div>
    </div>,

    // Step 1: Service Selection
    <div key="step1" className="quote-step">
      <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem', textAlign: 'center' }}>Que tipo de serviço você procura?</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        {services.map((s) => (
          <button 
            key={s.id}
            onClick={() => handleServiceSelect(s.id)}
            style={{ 
              padding: '1.25rem', 
              borderRadius: '16px', 
              border: formData.serviceType === s.id ? '2px solid #eb8923' : '1px solid #e2e8f0',
              background: formData.serviceType === s.id ? '#eb892305' : 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              transition: 'all 0.2s'
            }}
          >
            <s.icon size={20} color={formData.serviceType === s.id ? '#eb8923' : '#64748b'} />
            <span style={{ fontWeight: '600', color: '#1e293b', fontSize: '0.9rem' }}>{s.label}</span>
          </button>
        ))}
      </div>
      <button onClick={prevStep} style={{ marginTop: '2rem', background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <ArrowLeft size={16} /> Voltar
      </button>
    </div>,

    // Step 2: Client Details
    <div key="step2" className="quote-step">
      <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem', textAlign: 'center' }}>Conte um pouco sobre você</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div style={{ position: 'relative' }}>
          <User size={18} color="#94a3b8" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
          <input 
            type="text" 
            name="clientName" 
            placeholder="Seu nome completo" 
            value={formData.clientName} 
            onChange={handleInputChange}
            style={{ width: '100%', padding: '14px 16px 14px 48px', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none' }}
          />
        </div>
        <div style={{ position: 'relative' }}>
          <Mail size={18} color="#94a3b8" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
          <input 
            type="email" 
            name="email" 
            placeholder="Seu melhor e-mail" 
            value={formData.email} 
            onChange={handleInputChange}
            style={{ width: '100%', padding: '14px 16px 14px 48px', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none' }}
          />
        </div>
        <div style={{ position: 'relative' }}>
          <Phone size={18} color="#94a3b8" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
          <input 
            type="tel" 
            name="phone" 
            placeholder="Seu telefone / WhatsApp" 
            value={formData.phone} 
            onChange={handleInputChange}
            style={{ width: '100%', padding: '14px 16px 14px 48px', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none' }}
          />
        </div>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button onClick={prevStep} style={{ flex: 1, padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0', background: 'white', fontWeight: '600', color: '#64748b' }}>Voltar</button>
          <button 
            onClick={nextStep} 
            disabled={!formData.clientName || !formData.email || !formData.phone}
            style={{ 
              flex: 1, 
              padding: '14px', 
              borderRadius: '12px', 
              border: 'none', 
              background: '#eb8923', 
              fontWeight: '600', 
              color: 'white', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '8px',
              opacity: (!formData.clientName || !formData.email || !formData.phone) ? 0.5 : 1
            }}
          >
            Continuar <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>,

    // Step 3: Project Details
    <div key="step3" className="quote-step">
      <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem', textAlign: 'center' }}>Detalhes do Projeto</h3>
      <p style={{ color: '#64748b', textAlign: 'center', marginBottom: '1.5rem', fontSize: '0.9rem' }}>Quanto mais detalhes, mais preciso será seu orçamento.</p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {/* Conditional Fields: Construção Civil */}
        {formData.serviceType === 'Construção' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#475569', marginBottom: '0.5rem' }}>Tipo de Imóvel</label>
              <select 
                value={formData.additionalDetails?.propertyType || ''}
                onChange={(e) => updateAdditionalDetail('propertyType', e.target.value)}
                style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0', background: 'white' }}
              >
                <option value="">Selecione...</option>
                <option value="Moradia">Moradia</option>
                <option value="Prédio">Prédio / Apartamento</option>
                <option value="Armazém">Armazém / Industrial</option>
                <option value="Comercial">Loja / Comercial</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#475569', marginBottom: '0.5rem' }}>Área Prevista (m²)</label>
              <input 
                type="number"
                placeholder="Ex: 150"
                value={formData.additionalDetails?.area || ''}
                onChange={(e) => updateAdditionalDetail('area', e.target.value)}
                style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0' }}
              />
            </div>
          </div>
        )}

        {/* Conditional Fields: Manutenção */}
        {formData.serviceType === 'Manutenção' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#475569', marginBottom: '0.5rem' }}>Especialidade</label>
              <select 
                value={formData.additionalDetails?.maintenanceType || ''}
                onChange={(e) => updateAdditionalDetail('maintenanceType', e.target.value)}
                style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0', background: 'white' }}
              >
                <option value="">Selecione...</option>
                <option value="Elétrica">Instalação Elétrica</option>
                <option value="Canalização">Canalização / Hidráulica</option>
                <option value="Pintura">Pintura e Acabamentos</option>
                <option value="Impermeabilização">Impermeabilização</option>
                <option value="Geral">Manutenção Geral</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#475569', marginBottom: '0.5rem' }}>Urgência</label>
              <select 
                value={formData.additionalDetails?.urgency || ''}
                onChange={(e) => updateAdditionalDetail('urgency', e.target.value)}
                style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0', background: 'white' }}
              >
                <option value="">Selecione...</option>
                <option value="Baixa">Baixa (Planeamento)</option>
                <option value="Média">Média (Próximos dias)</option>
                <option value="Crítica">Crítica (Imediata)</option>
              </select>
            </div>
          </div>
        )}

        <div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: '600', color: '#475569', marginBottom: '0.5rem' }}>
            <DollarSign size={14} /> Expectativa de Orçamento
          </label>
          <select 
            name="budgetRange" 
            value={formData.budgetRange} 
            onChange={handleInputChange}
            style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none', background: 'white' }}
          >
            <option value="">Selecione uma faixa</option>
            {budgets.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>
        
        <div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: '600', color: '#475569', marginBottom: '0.5rem' }}>
            <MessageCircle size={14} /> Descrição Adicional
          </label>
          <textarea 
            name="description" 
            placeholder="Descreva o que você precisa, localização, prazos, etc..." 
            rows="3" 
            value={formData.description} 
            onChange={handleInputChange}
            style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none', resize: 'none' }}
          ></textarea>
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button onClick={prevStep} style={{ flex: 1, padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0', background: 'white', fontWeight: '600', color: '#64748b' }}>Voltar</button>
          <button 
            onClick={method === 'whatsapp' ? handleSubmitWhatsApp : handleSubmitPlatform}
            disabled={!formData.budgetRange || !formData.description}
            style={{ 
              flex: 1, 
              padding: '14px', 
              borderRadius: '12px', 
              border: 'none', 
              background: method === 'whatsapp' ? '#25D366' : '#eb8923', 
              fontWeight: '600', 
              color: 'white', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '8px',
              opacity: (!formData.budgetRange || !formData.description) ? 0.5 : 1
            }}
          >
            {method === 'whatsapp' ? 'Enviar WhatsApp' : 'Finalizar Pedido'} 
            {method === 'whatsapp' ? <MessageCircle size={18} /> : <ArrowRight size={18} />}
          </button>
        </div>
      </div>
    </div>
  ];

  if (submitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }}
        style={{ textAlign: 'center', padding: '3rem 1rem' }}
      >
        <div style={{ background: '#ecfdf5', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
          <CheckCircle2 size={48} color="#10b981" />
        </div>
        <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#1e293b', marginBottom: '1rem' }}>Pedido Enviado!</h2>
        <p style={{ color: '#64748b', maxWidth: '400px', margin: '0 auto 2.5rem', lineHeight: '1.6' }}>
          {method === 'whatsapp' 
            ? "Conclua o envio no seu aplicativo de WhatsApp. Entraremos em contato o mais breve possível."
            : "Sua solicitação foi recebida com sucesso. Nossa equipe analisará os detalhes e entrará em contato em breve."}
        </p>
        <button 
          onClick={() => { setStep(0); setSubmitted(false); }}
          style={{ padding: '12px 24px', background: '#f1f5f9', border: 'none', borderRadius: '100px', fontWeight: '600', color: '#1e293b', cursor: 'pointer' }}
        >
          Novo Orçamento
        </button>
      </motion.div>
    );
  }

  return (
    <div className="quote-form-container" style={{ 
      background: 'white', 
      borderRadius: '32px', 
      padding: '2.5rem', 
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      border: '1px solid #f1f5f9',
      maxWidth: '600px',
      margin: '0 auto'
    }}>
      {/* Progress Bar */}
      {step > 0 && (
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            <span>Etapa {step} de 3</span>
            <span>{Math.round((step / 3) * 100)}%</span>
          </div>
          <div style={{ height: '6px', background: '#f1f5f9', borderRadius: '100px', overflow: 'hidden' }}>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${(step / 3) * 100}%` }}
              style={{ height: '100%', background: '#eb8923', borderRadius: '100px' }}
            />
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {steps[step]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default QuoteForm;
