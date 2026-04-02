import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
  return (
    <div style={{ backgroundColor: 'var(--bg-light)', minHeight: '100vh' }}>
      <Header />
      
      <main className="privacy-container" style={{ padding: '150px 0 100px' }}>
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="section-title"
          >
            <h1 style={{ fontSize: '3rem', color: 'var(--primary-blue)', marginBottom: '15px' }}>
              Política de Privacidade
            </h1>
            <div className="underline"></div>
            <p style={{ marginTop: '20px', color: 'var(--text-muted)', fontSize: '1.1rem' }}>
              A sua privacidade é a nossa prioridade na DOCA Mozambique.
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
                  1. Compromisso com a Privacidade
                </h3>
                <p>
                  Na <strong>DOCA Construção</strong>, respeitamos a sua privacidade e estamos empenhados em proteger os seus dados pessoais. 
                  Esta Política de Privacidade descreve como recolhemos, utilizamos e salvaguardamos as suas informações quando utiliza o nosso website e serviços.
                </p>
              </section>

              <section style={{ marginBottom: '40px' }}>
                <h3 style={{ fontSize: '1.6rem', color: 'var(--primary-blue)', borderLeft: '4px solid var(--accent-yellow)', paddingLeft: '15px', marginBottom: '20px' }}>
                  2. Recolha de Dados
                </h3>
                <p>
                  Recolhemos informações que nos fornece diretamente através de formulários de contacto, pedidos de orçamento e no portal do cliente, incluindo:
                </p>
                <ul style={{ paddingLeft: '25px', listStyleType: 'square' }}>
                  <li style={{ marginBottom: '10px' }}>Informações de contacto (nome, email, telefone).</li>
                  <li style={{ marginBottom: '10px' }}>Dados de navegação e cookies (endereço IP, tipo de dispositivo).</li>
                  <li style={{ marginBottom: '10px' }}>Informações relacionadas a projectos de engenharia e construção.</li>
                </ul>
              </section>

              <section style={{ marginBottom: '40px' }}>
                <h3 style={{ fontSize: '1.6rem', color: 'var(--primary-blue)', borderLeft: '4px solid var(--accent-yellow)', paddingLeft: '15px', marginBottom: '20px' }}>
                  3. Utilização dos Dados
                </h3>
                <p>
                  As informações recolhidas são utilizadas exclusivamente para:
                </p>
                <ul style={{ paddingLeft: '25px', listStyleType: 'square' }}>
                  <li style={{ marginBottom: '10px' }}>Processamento de pedidos de cotação e propostas técnicas.</li>
                  <li style={{ marginBottom: '10px' }}>Melhoria contínua da experiência no nosso website.</li>
                  <li style={{ marginBottom: '10px' }}>Comunicação direta sobre o progresso dos seus projectos.</li>
                  <li style={{ marginBottom: '10px' }}>Cumprimento de obrigações legais em Moçambique.</li>
                </ul>
              </section>

              <section style={{ marginBottom: '40px' }}>
                <h3 style={{ fontSize: '1.6rem', color: 'var(--primary-blue)', borderLeft: '4px solid var(--accent-yellow)', paddingLeft: '15px', marginBottom: '20px' }}>
                  4. Segurança e Proteção
                </h3>
                <p>
                  Implementamos protocolos de segurança rigorosos para evitar o acesso não autorizado, alteração, divulgação ou destruição dos seus dados pessoais. 
                  O nosso website utiliza tecnologia SSL (Secure Sockets Layer) para encriptar todas as transmissões de dados.
                </p>
              </section>

              <section style={{ marginBottom: '40px' }}>
                <h3 style={{ fontSize: '1.6rem', color: 'var(--primary-blue)', borderLeft: '4px solid var(--accent-yellow)', paddingLeft: '15px', marginBottom: '20px' }}>
                  5. Política de Cookies
                </h3>
                <p>
                  Utilizamos cookies para melhorar a sua experiência de navegação. Cookies são pequenos ficheiros de texto guardados no seu dispositivo que nos ajudam a:
                </p>
                <ul style={{ paddingLeft: '25px', listStyleType: 'square' }}>
                  <li style={{ marginBottom: '10px' }}>Lembrar as suas preferências (como o login no portal).</li>
                  <li style={{ marginBottom: '10px' }}>Analisar o tráfego e comportamento dos usuários para melhorias técnicas.</li>
                  <li style={{ marginBottom: '10px' }}>Garantir a segurança durante a utilização dos nossos formulários.</li>
                </ul>
                <p>
                  Pode gerir ou desactivar os cookies através das definições do seu navegador a qualquer momento.
                </p>
              </section>

              <section style={{ marginBottom: '40px' }}>
                <h3 style={{ fontSize: '1.6rem', color: 'var(--primary-blue)', borderLeft: '4px solid var(--accent-yellow)', paddingLeft: '15px', marginBottom: '20px' }}>
                  6. Seus Direitos
                </h3>
                <p>
                  Como utilizador, tem o direito de solicitar a actualização, correcção ou eliminação permanente dos seus dados. 
                  Para qualquer questão relacionada, contacte o nosso Encarregado de Proteção de Dados.
                </p>
              </section>

              <div style={{ 
                marginTop: '60px', 
                padding: '30px', 
                backgroundColor: 'var(--bg-light)', 
                borderRadius: '16px',
                textAlign: 'center'
              }}>
                <h4 style={{ color: 'var(--primary-blue)', marginBottom: '15px' }}>Dúvidas ou Questões?</h4>
                <p style={{ margin: 0 }}>Envie-nos um email para: <strong>geral@docacm.com</strong></p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
