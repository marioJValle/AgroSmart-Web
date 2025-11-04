
import React from 'react';
import { Table, Button } from 'react-bootstrap';

const TablaDatos = ({ data, columns, onEdit, onDelete }) => {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          {columns.map(col => <th key={col.key}>{col.header}</th>)}
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((item, index) => (
            <tr key={item.id ?? `${item.nombre ?? item.titulo ?? 'row'}-${index}`}>
              {columns.map(col => (
                <td key={col.key ?? `${col.header}-${index}`}>
                  {/* Renderizar imagen si la clave de la columna es para una imagen */}
                  {col.key.startsWith('image') ? (
                    <img 
                      src={item[col.key]} 
                      alt="-" 
                      style={{ width: '50px', height: '50px', borderRadius: '8px', objectFit: 'cover' }} 
                    />
                  ) : (
                    item[col.key]
                  )}
                </td>
              ))}
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => onEdit(item)}
                  className="me-2"
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => onDelete(item)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={columns.length + 1} className="text-center">
              No hay datos en la base de datos
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default TablaDatos;