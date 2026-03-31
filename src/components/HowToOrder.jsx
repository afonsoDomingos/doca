import React from 'react';
import { motion } from 'framer-motion';
import { ClipboardList, MessageSquare, Calculator, TrendingUp, CheckCircle2 } from 'lucide-react';

const HowToOrder = ({ onOpenQuote }) => {
    const steps = [
        {
            icon: MessageSquare,
            title: "1. Escolha o Canal",
            description: "Pode solicitar via WhatsApp para uma resposta imediata ou através da nossa plataforma dedicada para um processo mais formal.",
            color: "#FFCC00"
        },
        {
            icon: ClipboardList,
            title: "2. Detalhes Técnicos",
            description: "Forneça informações sobre o tipo de imóvel, área prevista e urgência. Quanto mais detalhes, mais preciso será o orçamento.",
            color: "#003366"
        },
        {
            icon: Calculator,
            title: "3. Proposta Técnica",
            description: "A nossa equipa de engenharia analisa o seu pedido e envia uma proposta detalhada com prazos e custos transparentes.",
            color: "#FFCC00"
        },
        {
            icon: TrendingUp,
            title: "4. Acompanhe a Obra",
            description: "Após a aprovação, pode criar uma conta para ver relatórios diários, fotos e o progresso da execução em tempo real.",
            color: "#003366"
        }
    ];

    return (
        <section id="como-funciona" style={{ backgroundColor: '#fff', padding: '100px 0' }}>
            <div className="container">
                <div className="section-title">
                    <p style={{ color: 'var(--accent-yellow)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '10px' }}>Simples e Transparente</p>
                    <h2 style={{ fontSize: '2.5rem', color: '#003366' }}>Como <span style={{ color: 'var(--accent-yellow-dark)' }}>Solicitar</span> a sua Obra?</h2>
                    <div className="underline"></div>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                    gap: '40px',
                    marginTop: '60px',
                    position: 'relative'
                }}>
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            viewport={{ once: true }}
                            style={{
                                textAlign: 'center',
                                padding: '2rem',
                                borderRadius: '30px',
                                background: index % 2 === 0 ? '#F8FAFC' : 'white',
                                border: '1px solid #F1F5F9',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                boxShadow: '0 10px 30px -10px rgba(0,0,0,0.05)'
                            }}
                        >
                            <div style={{
                                width: '80px',
                                height: '80px',
                                borderRadius: '24px',
                                background: step.color,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: step.color === '#FFCC00' ? '#003366' : 'white',
                                marginBottom: '25px',
                                boxShadow: `0 15px 30px ${step.color}30`
                            }}>
                                <step.icon size={36} />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '15px', color: '#003366' }}>{step.title}</h3>
                            <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: '1.7' }}>{step.description}</p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    style={{
                        marginTop: '80px',
                        textAlign: 'center',
                        background: 'linear-gradient(135deg, #003366 0%, #001e40 100%)',
                        padding: '4rem 2rem',
                        borderRadius: '40px',
                        color: 'white',
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                >
                    <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '300px', height: '300px', background: 'rgba(255,204,0,0.05)', borderRadius: '50%' }}></div>

                    <h2 style={{ fontSize: '2.2rem', marginBottom: '1.5rem', fontWeight: '800' }}>Pronto para <span style={{ color: 'var(--accent-yellow)' }}>começar?</span></h2>
                    <p style={{ maxWidth: '600px', margin: '0 auto 2.5rem', color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem' }}>
                        Transforme o seu projeto em realidade com a confiança da DOCA Construção. Clique no botão abaixo e peça o seu orçamento gratuito hoje.
                    </p>

                    <button
                        onClick={onOpenQuote}
                        style={{
                            backgroundColor: 'var(--accent-yellow)',
                            color: '#003366',
                            padding: '18px 40px',
                            borderRadius: '100px',
                            fontWeight: '900',
                            fontSize: '1rem',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            margin: '0 auto',
                            boxShadow: '0 20px 40px rgba(255,204,0,0.2)'
                        }}
                    >
                        Fazer Pedido Agora <CheckCircle2 size={20} />
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default HowToOrder;
