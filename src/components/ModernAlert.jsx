import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  CheckCircle, 
  AlertCircle, 
  HelpCircle, 
  Info,
  AlertTriangle,
  Edit
} from 'lucide-react';

const ModernAlert = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  type = 'info', // 'success', 'error', 'confirm', 'info'
  confirmText = 'Confirmar',
  cancelText = 'Cancelar' 
}) => {
  const [inputValue, setInputValue] = React.useState('');

  React.useEffect(() => {
    if (isOpen) setInputValue('');
  }, [isOpen]);

  const getIcon = () => {
    switch (type) {
      case 'success': return <CheckCircle size={48} color="#10b981" />;
      case 'error': return <AlertCircle size={48} color="#ef4444" />;
      case 'confirm': return <HelpCircle size={48} color="#FFCC00" />;
      case 'prompt': return <Edit size={48} color="#003366" />;
      case 'warning': return <AlertTriangle size={48} color="#f59e0b" />;
      default: return <Info size={48} color="#3b82f6" />;
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        style={{ 
          position: 'fixed', 
          inset: 0, 
          zIndex: 9999, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          padding: '1.5rem',
          pointerEvents: 'none'
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{ 
            position: 'absolute', 
            inset: 0, 
            background: 'rgba(0, 0, 0, 0.4)', 
            backdropFilter: 'blur(8px)',
            pointerEvents: 'auto'
          }}
        />
        
        <motion.div
          initial={{ scale: 0.9, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 20, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          style={{ 
            background: 'white', 
            width: '100%', 
            maxWidth: '450px', 
            borderRadius: '32px', 
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            position: 'relative',
            zIndex: 10000,
            overflow: 'hidden',
            pointerEvents: 'auto'
          }}
        >
          {/* Header Accent */}
          <div style={{ 
            height: '6px', 
            width: '100%', 
            background: type === 'confirm' ? '#FFCC00' : (type === 'success' ? '#10b981' : (type === 'error' ? '#ef4444' : '#3b82f6')) 
          }} />

          <div style={{ padding: '2.5rem', textAlign: 'center' }}>
            <div style={{ 
              marginBottom: '1.5rem', 
              display: 'inline-flex', 
              padding: '1rem', 
              background: '#f8fafc',
              borderRadius: '24px'
            }}>
              {getIcon()}
            </div>
            
            <h3 style={{ 
              fontSize: '1.5rem', 
              fontWeight: '900', 
              color: '#0f172a', 
              marginBottom: '1rem',
              letterSpacing: '-0.5px'
            }}>
              {title}
            </h3>
            
            <p style={{ 
              color: '#64748b', 
              fontSize: '1rem', 
              lineHeight: '1.6',
              margin: 0,
              whiteSpace: 'pre-wrap'
            }}>
              {message}
            </p>

            {type === 'prompt' && (
              <div style={{ marginTop: '1.5rem' }}>
                <input 
                  autoFocus
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Introduzir valor..."
                  style={{ 
                    width: '100%', 
                    padding: '14px', 
                    borderRadius: '16px', 
                    border: '2px solid #f1f5f9', 
                    background: '#f8fafc',
                    fontSize: '1rem',
                    outline: 'none',
                    textAlign: 'center',
                    fontWeight: '600'
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                       if (onConfirm) onConfirm(inputValue);
                       onClose();
                    }
                  }}
                />
              </div>
            )}

            <div style={{ 
              marginTop: '2.5rem', 
              display: 'flex', 
              gap: '12px',
              justifyContent: 'center'
            }}>
              {(type === 'confirm' || type === 'prompt') && (
                <button
                  onClick={onClose}
                  style={{
                    flex: 1,
                    padding: '14px',
                    borderRadius: '16px',
                    border: '1px solid #e2e8f0',
                    background: 'white',
                    color: '#64748b',
                    fontWeight: '700',
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.background = '#f8fafc'}
                  onMouseLeave={(e) => e.target.style.background = 'white'}
                >
                  {cancelText}
                </button>
              )}
              
              <button
                onClick={() => {
                  if (onConfirm) onConfirm(type === 'prompt' ? inputValue : true);
                  onClose();
                }}
                style={{
                  flex: 1,
                  padding: '14px',
                  borderRadius: '16px',
                  border: 'none',
                  background: type === 'error' ? '#ef4444' : (type === 'confirm' ? '#FFCC00' : (type === 'success' ? '#10b981' : '#003366')),
                  color: 'white',
                  fontWeight: '900',
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.2s',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}
                onMouseEnter={(e) => e.target.style.opacity = '0.9'}
                onMouseLeave={(e) => e.target.style.opacity = '1'}
              >
                {type === 'confirm' || type === 'prompt' ? confirmText : 'OK'}
              </button>
            </div>
          </div>
          
          <button 
            onClick={onClose}
            style={{ 
              position: 'absolute', 
              top: '20px', 
              right: '20px', 
              background: '#f1f5f9', 
              border: 'none', 
              borderRadius: '10px', 
              padding: '6px', 
              cursor: 'pointer',
              color: '#94a3b8'
            }}
          >
            <X size={16} />
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ModernAlert;
