
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ModalFormulario = ({ show, handleClose, handleSubmit, formData, setFormData, fields, title, imageField }) => {
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    // Si hay datos en el formulario (editando) y existe el campo de imagen, muestra la vista previa
    if (formData && formData[imageField]) {
      setPreview(formData[imageField]);
    } else {
      setPreview(null); // Limpia la vista previa si no hay imagen
    }
  }, [formData, imageField]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 800;
          const scaleSize = MAX_WIDTH / img.width;
          canvas.width = MAX_WIDTH;
          canvas.height = img.height * scaleSize;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          const resizedBase64 = canvas.toDataURL("image/jpeg", 0.7);
          
          setFormData(prev => ({
            ...prev,
            [imageField]: resizedBase64
          }));
          setPreview(resizedBase64);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit();
  };

  // Sobrescribir handleClose para limpiar el preview
  const handleOnHide = () => {
    setPreview(null);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleOnHide}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleFormSubmit}>
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

          {/* Campo para la imagen */}
          <Form.Group controlId="formImage" className="mb-3">
            <Form.Label>Imagen</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            {preview && (
              <div className="mt-2">
                <img src={preview} alt="Vista previa" style={{ maxWidth: '100%', borderRadius: '8px' }} />
              </div>
            )}
          </Form.Group>

          {formData.id && (
            <input type="hidden" value={formData.id} />
          )}
          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={handleOnHide} className="me-2">
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
