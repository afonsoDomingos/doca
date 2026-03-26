import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import QuoteForm from './QuoteForm';

const QuoteModal = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(15, 23, 42, 0.8)',
              backdropFilter: 'blur(8px)'
            }}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '650px',
              maxHeight: '90vh',
              overflowY: 'auto',
              borderRadius: '32px',
              background: 'white',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              zIndex: 10001
            }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                padding: '10px',
                borderRadius: '50%',
                background: '#f1f5f9',
                border: 'none',
                cursor: 'pointer',
                color: '#64748b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10
              }}
            >
              <X size={20} />
            </button>

            {/* Reuse QuoteForm */}
            <div style={{ padding: '10px' }}>
              <QuoteForm />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default QuoteModal;
