
import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ModalFormulario = ({ show, handleClose, handleSubmit, formData, setFormData, fields, title }) => {

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: value 
      // ✅ El ID se mantiene intacto si existe
    }));
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => {
          e.preventDefault();
          // console.log("📤 Enviando formulario con datos:", formData); // Debug
          handleSubmit();
        }}>
          {fields.map(field => (
            <Form.Group controlId={`form${field.name}`} key={field.name} className="mb-3">
              <Form.Label>{field.label}</Form.Label>
              <Form.Control
                type={field.type}
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleChange}
                required
              />
            </Form.Group>
          ))}
          {/* ✅ Campo oculto para debug del ID */}
          {formData.id && (
            <input type="hidden" value={formData.id} />
          )}
          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={handleClose} className="me-2">
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              Guardar
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalFormulario;
