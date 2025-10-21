import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';

/**
 * A simple bar chart component created with divs.
 * @param {{title: string, data: {label: string, value: number}[]}} props
 */
const BarChart = ({ title, data, showDataLabels = false }) => {
  if (!data || data.length === 0) {
    return (
      <Card>
        <Card.Body className="text-center text-muted">{title}: No data available</Card.Body>
      </Card>
    );
  }

  const maxValue = Math.max(...data.map(item => item.value));

  return (
    <Card>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <div style={{ height: '250px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          <Row className="g-0 h-100" style={{ borderLeft: '2px solid #eee', borderBottom: '2px solid #eee' }}>
            {data.map((item, index) => {
              const barHeight = `${(item.value / maxValue) * 100}%`;
              return (
                <Col key={index} className="d-flex flex-column justify-content-end align-items-center px-2 position-relative">
                  {showDataLabels && <div style={{ fontSize: '0.75rem', color: '#6c757d' }}>{item.value.toLocaleString()}</div>}
                  <div 
                    className="bg-primary" 
                    style={{ width: '80%', height: barHeight, borderRadius: '4px 4px 0 0' }}
                    title={`${item.label}: ${item.value}`}
                  ></div>
                  <small className="text-muted mt-1" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.label}
                  </small>
                </Col>
              );
            })}
          </Row>
        </div>
      </Card.Body>
    </Card>
  );
};

export default BarChart;
