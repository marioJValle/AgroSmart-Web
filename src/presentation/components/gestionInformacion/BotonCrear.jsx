
import React from 'react';
import { Button } from 'react-bootstrap';

const BotonCrear = ({ onClick }) => {
  return (
    <Button variant="primary" onClick={onClick} className="mb-3">
      Añadir Nuevo
    </Button>
  );
};

export default BotonCrear;
