
import React, { useState } from 'react';
import { Card, ListGroup, Button, Form, Alert } from 'react-bootstrap';
import { UserRepository } from '../../../data/repositories/userRepository/UserRepository';

const repository = new UserRepository();

const UserInfo = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);
  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  // Placeholder user data if not provided
  const currentUser = user || {
    role: 'Administrator',
    department: 'Unknown',
    municipality: 'Unknown',
    phoneNumber: 'N/A',
    username: 'User Example',
    email: 'user@example.com'
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedUser(user);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedUser(user);
    setShowAlert(false); // Ocultar alerta al cancelar
  };

  const handleSaveClick = async () => {
    try {
      await repository.updateUser(editedUser.id, editedUser);
      setAlertVariant('success');
      setAlertMessage('¡Cambios guardados con éxito!');
      setShowAlert(true);
      setIsEditing(false);
      // Opcional: Actualizar el estado global del usuario si es necesario
      // setUser(editedUser); // Si UserContext tiene un setUser
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
      setAlertVariant('danger');
      setAlertMessage('Error al guardar los cambios. Inténtalo de nuevo.');
      setShowAlert(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Card className="shadow-sm mb-4">
      <Card.Header as="h5" className="d-flex justify-content-between align-items-center">
        Información del Usuario
        {!isEditing ? (
          <Button variant="primary" size="sm" onClick={handleEditClick}>Editar</Button>
        ) : (
          <div>
            <Button variant="success" size="sm" className="me-2" onClick={handleSaveClick}>Guardar</Button>
            <Button variant="secondary" size="sm" onClick={handleCancelClick}>Cancelar</Button>
          </div>
        )}
      </Card.Header>
      <Card.Body>
        {showAlert && (
          <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>
            {alertMessage}
          </Alert>
        )}
        <ListGroup variant="flush">
          <ListGroup.Item>
            <strong>Nombre de Usuario:</strong>
            {isEditing ? (
              <Form.Control
                type="text"
                name="username"
                value={editedUser.username || ''}
                onChange={handleChange}
                className="d-inline-block w-auto ms-2"
              />
            ) : (
              <span className="ms-2">{currentUser.username}</span>
            )}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Email:</strong>
            <span className="ms-2">{currentUser.email}</span>
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Rol:</strong>
            <span className="ms-2">{currentUser.role}</span>
          </ListGroup.Item>

          <ListGroup.Item>
            <strong>Departamento:</strong>
            {isEditing ? (
              <Form.Control
                type="text"
                name="department"
                value={editedUser.department || ''}
                onChange={handleChange}
                className="d-inline-block w-auto ms-2"
              />
            ) : (
              <span className="ms-2">{currentUser.department}</span>
            )}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Municipio:</strong>
            {isEditing ? (
              <Form.Control
                type="text"
                name="municipality"
                value={editedUser.municipality || ''}
                onChange={handleChange}
                className="d-inline-block w-auto ms-2"
              />
            ) : (
              <span className="ms-2">{currentUser.municipality}</span>
            )}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Teléfono:</strong>
            {isEditing ? (
              <Form.Control
                type="text"
                name="phoneNumber"
                value={editedUser.phoneNumber || ''}
                onChange={handleChange}
                className="d-inline-block w-auto ms-2"
              />
            ) : (
              <span className="ms-2">{currentUser.phoneNumber}</span>
            )}
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default UserInfo;
