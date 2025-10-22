
import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

const UserInfo = ({ user }) => {
  // Placeholder user data if not provided
  const currentUser = user || {
    role: 'Administrator',
    memberSince: new Date().toLocaleDateString(),
    department: 'Development'
  };

  return (
    <Card className="shadow-sm">
      <Card.Header as="h5">Información del Usuario</Card.Header>
      <Card.Body>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <strong>Rol:</strong> {currentUser.role}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Miembro desde:</strong> {currentUser.memberSince}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Departamento:</strong> {currentUser.department}
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default UserInfo;
