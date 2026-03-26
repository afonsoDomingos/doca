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
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import QuoteModal from './components/QuoteModal';
import CustomerAuth from './pages/CustomerAuth';
import CustomerDashboard from './pages/CustomerDashboard';

const Home = ({ onOpenQuote }) => (
  <div className="app-container">
    <Header onOpenQuote={onOpenQuote} />
    <main>
      <Hero onOpenQuote={onOpenQuote} />
      <About />
      <Services />
      <MissionVision />
      <Projects />
      <Testimonials />
      <Contact />
    </main>
    <Footer />
  </div>
);

function App() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home onOpenQuote={() => setIsQuoteModalOpen(true)} />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/portal/login" element={<CustomerAuth />} />
        <Route path="/portal/dashboard" element={<CustomerDashboard />} />
      </Routes>
      <QuoteModal isOpen={isQuoteModalOpen} onClose={() => setIsQuoteModalOpen(false)} />
    </Router>
  );
}

export default App;
