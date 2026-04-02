import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

const TermsOfService = () => {
  return (
    <div style={{ backgroundColor: 'var(--bg-light)', minHeight: '100vh' }}>
      <Header />
      
      <main className="terms-container" style={{ padding: '150px 0 100px' }}>
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="section-title"
          >
            <h1 style={{ fontSize: '3rem', color: 'var(--primary-blue)', marginBottom: '15px' }}>
              Termos de Uso e Serviço
            </h1>
            <div className="underline"></div>
            <p style={{ marginTop: '20px', color: 'var(--text-muted)', fontSize: '1.1rem' }}>
              Condições gerais para utilização da plataforma e serviços DOCA Mozambique.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            style={{ 
              maxWidth: '900px', 
              margin: '50px auto 0', 
              backgroundColor: 'white', 
              padding: '60px', 
              borderRadius: '24px', 
              boxShadow: 'var(--shadow-lg)' 
            }}
          >
            <div className="content-body" style={{ color: 'var(--text-dark)', lineHeight: '1.8' }}>
              <p className="last-updated" style={{ marginBottom: '40px', fontStyle: 'italic', fontWeight: '500', color: 'var(--accent-yellow-dark)' }}>
                Última atualização: 02 de Abril de 2026
              </p>

              <section style={{ marginBottom: '40px' }}>
                <h3 style={{ fontSize: '1.6rem', color: 'var(--primary-blue)', borderLeft: '4px solid var(--accent-yellow)', paddingLeft: '15px', marginBottom: '20px' }}>
                  1. Aceitação dos Termos
                </h3>
                <p>
                  Ao aceder ao website da <strong>DOCA Construção</strong> e utilizar os nossos serviços, o utilizador concorda em cumprir e estar vinculado aos seguintes termos e condições. Se não concordar com qualquer parte destes termos, não deverá utilizar os nossos serviços.
                </p>
              </section>

              <section style={{ marginBottom: '40px' }}>
                <h3 style={{ fontSize: '1.6rem', color: 'var(--primary-blue)', borderLeft: '4px solid var(--accent-yellow)', paddingLeft: '15px', marginBottom: '20px' }}>
                  2. Descrição dos Serviços
                </h3>
                <p>
                  A DOCA fornece serviços de engenharia civil, construção civil, manutenção de edifícios e gestão de ativos imobiliários em Moçambique. Todas as cotações e propostas emitidas através deste website são baseadas nas informações fornecidas pelo utilizador e estão sujeitas a verificação técnica final no local da obra.
                </p>
              </section>

              <section style={{ marginBottom: '40px' }}>
                <h3 style={{ fontSize: '1.6rem', color: 'var(--primary-blue)', borderLeft: '4px solid var(--accent-yellow)', paddingLeft: '15px', marginBottom: '20px' }}>
                  3. Uso do Portal do Cliente
                </h3>
                <p>
                  O utilizador é responsável por manter a confidencialidade da sua conta e senha no Portal do Cliente. Quaisquer atividades realizadas através da conta do utilizador serão da sua total responsabilidade para efeitos de solicitação de serviços de engenharia.
                </p>
              </section>

              <section style={{ marginBottom: '40px' }}>
                <h3 style={{ fontSize: '1.6rem', color: 'var(--primary-blue)', borderLeft: '4px solid var(--accent-yellow)', paddingLeft: '15px', marginBottom: '20px' }}>
                  4. Cotações e Validade
                </h3>
                <p>
                  Salvo disposição em contrário, todas as cotações geradas possuem uma validade de 15 dias corridos. Preços e prazos podem sofrer variações devido a flutuações de mercado de materiais de construção ou especificações técnicas imprevistas.
                </p>
              </section>

              <section style={{ marginBottom: '40px' }}>
                <h3 style={{ fontSize: '1.6rem', color: 'var(--primary-blue)', borderLeft: '4px solid var(--accent-yellow)', paddingLeft: '15px', marginBottom: '20px' }}>
                  5. Propriedade Intelectual
                </h3>
                <p>
                  Todo o conteúdo deste website, incluindo textos, logotipos, designs de engenharia, fotografias de obras e software, é propriedade da DOCA Mozambique ou dos seus licenciadores e está protegido por leis de propriedade intelectual aplicáveis em Moçambique.
                </p>
              </section>

              <section style={{ marginBottom: '40px' }}>
                <h3 style={{ fontSize: '1.6rem', color: 'var(--primary-blue)', borderLeft: '4px solid var(--accent-yellow)', paddingLeft: '15px', marginBottom: '20px' }}>
                  6. Limitação de Responsabilidade
                </h3>
                <p>
                  A DOCA não se responsabiliza por quaisquer danos indiretos, consequenciais ou incidentais resultantes da utilização das informações disponibilizadas neste website antes da assinatura formal de um contrato de prestação de serviços de construção.
                </p>
              </section>

              <section style={{ marginBottom: '40px' }}>
                <h3 style={{ fontSize: '1.6rem', color: 'var(--primary-blue)', borderLeft: '4px solid var(--accent-yellow)', paddingLeft: '15px', marginBottom: '20px' }}>
                  7. Jurisdição e Lei Aplicável
                </h3>
                <p>
                  Estes termos são regidos pelas leis da República de Moçambique. Qualquer litígio resultante destes termos será submetido à jurisdição exclusiva dos tribunais da Cidade de Maputo.
                </p>
              </section>

              <div style={{ 
                marginTop: '60px', 
                padding: '30px', 
                backgroundColor: 'var(--bg-light)', 
                borderRadius: '16px',
                textAlign: 'center'
              }}>
                <h4 style={{ color: 'var(--primary-blue)', marginBottom: '15px' }}>DOCA Construção, Lda.</h4>
                <p style={{ margin: 0, fontSize: '0.9rem' }}>Construindo o futuro com confiança e agilidade desde 2024.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TermsOfService;
