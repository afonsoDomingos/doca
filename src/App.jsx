import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import MissionVision from './components/MissionVision';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import QuoteModal from './components/QuoteModal';
import CustomerAuth from './pages/CustomerAuth';
import CustomerDashboard from './pages/CustomerDashboard';
import WhatsAppContact from './components/WhatsAppContact';
import HowToOrder from './components/HowToOrder';

const Home = ({ onOpenQuote }) => (
  <div className="app-container">
    <Header onOpenQuote={onOpenQuote} />
    <main>
      <Hero onOpenQuote={onOpenQuote} />
      <About />
      <Services />
      <HowToOrder onOpenQuote={onOpenQuote} />
      <MissionVision />
      <Projects />
      <Testimonials />
      <Contact />
    </main>
    <Footer />
    <WhatsAppContact variant="floating" />
  </div>
);

function App() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = React.useState(false);

  React.useEffect(() => {
    const trackVisit = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_BASE_URL || (import.meta.env.DEV ? 'http://localhost:5000' : '');
        await fetch(`${API_URL}/api/track-visit`, { method: 'POST' });
      } catch (err) {
        console.group('📊 DOCA Global Tracker');
        console.error('Failed to track visit:', err.message);
        console.groupEnd();
      }
    };
    if (window.location.pathname === '/') trackVisit();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home onOpenQuote={() => setIsQuoteModalOpen(true)} />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/portal/login" element={<CustomerAuth />} />
        <Route path="/portal/dashboard" element={<CustomerDashboard />} />
      </Routes>
      <QuoteModal isOpen={isQuoteModalOpen} onClose={() => setIsQuoteModalOpen(false)} />
    </Router>
  );
}

export default App;
