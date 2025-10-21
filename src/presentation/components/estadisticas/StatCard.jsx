import React from 'react';
import { Card } from 'react-bootstrap';

const StatCard = ({ title, value, description, className }) => {
  return (
    <Card className={`text-center ${className}`}>
      <Card.Body>
        <Card.Title as="h3">{value}</Card.Title>
        <Card.Text className="text-muted">{title}</Card.Text>
        {description && <small className="text-muted">{description}</small>}
      </Card.Body>
    </Card>
  );
};

export default StatCard;
