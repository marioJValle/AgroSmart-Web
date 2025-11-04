import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import StatCard from './StatCard';

describe('StatCard Component', () => {
  it('should render the title, value, and description correctly', () => {
    // 1. Arrange: Definimos los datos de prueba
    const testTitle = 'Usuarios Totales';
    const testValue = '1,500';
    const testDescription = 'Usuarios registrados en la plataforma';

    // 2. Act: Renderizamos el componente con los datos de prueba
    render(
      <StatCard 
        title={testTitle} 
        value={testValue} 
        description={testDescription} 
      />
    );

    // 3. Assert: Verificamos que el resultado es el esperado
    // Verificamos que el título está en el documento
    expect(screen.getByText(testTitle)).toBeInTheDocument();
    
    // Verificamos que el valor está en el documento
    expect(screen.getByText(testValue)).toBeInTheDocument();

    // Verificamos que la descripción está en el documento
    expect(screen.getByText(testDescription)).toBeInTheDocument();
  });

  it('should render correctly without an optional description', () => {
    // 1. Arrange
    const testTitle = 'Cultivos';
    const testValue = '25';

    // 2. Act
    render(<StatCard title={testTitle} value={testValue} />);

    // 3. Assert
    expect(screen.getByText(testTitle)).toBeInTheDocument();
    expect(screen.getByText(testValue)).toBeInTheDocument();
    
    // Verificamos que la descripción NO está, ya que no se pasó como prop
    const descriptionElement = screen.queryByText(/usuarios registrados/i); // Usamos una expresión regular para ser más flexibles
    expect(descriptionElement).not.toBeInTheDocument();
  });
});
