
import React, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';

const AlertaNotificacion = ({ show, message, variant, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // La alerta se cierra después de 3 segundos

      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) {
    return null;
  }

  return (
    <Alert 
      variant={variant}
      onClose={onClose}
      dismissible
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 9999,
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
      }}
    >
      {message}
    </Alert>
  );
};

export default AlertaNotificacion;
