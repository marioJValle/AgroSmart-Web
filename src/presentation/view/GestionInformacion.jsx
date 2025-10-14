
import React, { useState } from 'react';
import { Tabs, Tab, Container } from 'react-bootstrap';
import TablaDatos from '../components/gestionInformacion/TablaDatos';
import BotonCrear from '../components/gestionInformacion/BotonCrear';
import ModalFormulario from '../components/gestionInformacion/ModalFormulario';
import ModalConfirmacion from '../components/gestionInformacion/ModalConfirmacion';
import AlertaNotificacion from '../components/gestionInformacion/AlertaNotificacion';

// Mock Data
const mockData = {
  cultivos: [
    { id: 1, nombre: 'Maíz', descripcion: 'Cereal de grano grande.' },
    { id: 2, nombre: 'Trigo', descripcion: 'Cereal para panificación.' },
  ],
  fertilizantes: [
    { id: 1, nombre_fertilizante: 'Nitrato de Amonio', tipo: 'Químico', dosis_recomendada: '200 kg/ha', proveedor: 'Fertilizantes del Sur', advertencias: 'No mezclar con superfosfatos.' },
    { id: 2, nombre_fertilizante: 'Estiércol de Vaca', tipo: 'Orgánico', dosis_recomendada: '10 ton/ha', proveedor: 'Granja El Roble', advertencias: 'Aplicar al menos 30 días antes de la siembra.' },
  ],
  deficiencias: [
    { id: 1, nombre: 'Clorosis', deficiencia_encontrada: 'Amarillamiento de las hojas por falta de clorofila.' },
    { id: 2, nombre: 'Necrosis', deficiencia_encontrada: 'Muerte del tejido de la planta, manchas marrones o negras.' },
  ],
};

// Column and Field Definitions
const definitions = {
  cultivos: {
    columns: [
      { header: 'Nombre', key: 'nombre' },
      { header: 'Descripción', key: 'descripcion' },
    ],
    fields: [
      { label: 'Nombre del Cultivo', name: 'nombre', type: 'text' },
      { label: 'Descripción', name: 'descripcion', type: 'text' },
    ],
    modalTitle: 'Cultivo'
  },
  fertilizantes: {
    columns: [
      { header: 'Nombre', key: 'nombre_fertilizante' },
      { header: 'Tipo', key: 'tipo' },
      { header: 'Dosis', key: 'dosis_recomendada' },
      { header: 'Proveedor', key: 'proveedor' },
      { header: 'Advertencias', key: 'advertencias' },
    ],
    fields: [
      { label: 'Nombre del Fertilizante', name: 'nombre_fertilizante', type: 'text' },
      { label: 'Tipo', name: 'tipo', type: 'text' },
      { label: 'Dosis Recomendada', name: 'dosis_recomendada', type: 'text' },
      { label: 'Proveedor', name: 'proveedor', type: 'text' },
      { label: 'Advertencias', name: 'advertencias', type: 'text' },
    ],
    modalTitle: 'Fertilizante'
  },
  deficiencias: {
    columns: [
      { header: 'Nombre', key: 'nombre' },
      { header: 'Deficiencia Encontrada', key: 'deficiencia_encontrada' },
    ],
    fields: [
      { label: 'Nombre', name: 'nombre', type: 'text' },
      { label: 'Deficiencia Encontrada', name: 'deficiencia_encontrada', type: 'text' },
    ],
    modalTitle: 'Deficiencia Nutricional'
  }
};

const GestionInformacion = () => {
  const [key, setKey] = useState('cultivos');
  const [data, setData] = useState(mockData);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', variant: 'success' });

  const showAlert = (message, variant = 'success') => {
    setAlert({ show: true, message, variant });
  };

  const handleShowFormModal = () => {
    setIsEditing(false);
    setFormData({});
    setShowFormModal(true);
  };

  const handleCloseFormModal = () => setShowFormModal(false);

  const handleEdit = (item) => {
    setIsEditing(true);
    setFormData(item);
    setShowFormModal(true);
  };

  const handleDelete = (id) => {
    setItemToDelete(id);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = () => {
    setData(prevData => ({
      ...prevData,
      [key]: prevData[key].filter(item => item.id !== itemToDelete)
    }));
    setShowConfirmModal(false);
    setItemToDelete(null);
    showAlert('Registro eliminado con éxito.', 'danger');
  };

  const handleSubmit = () => {
    if (isEditing) {
      // Update
      setData(prevData => ({
        ...prevData,
        [key]: prevData[key].map(item => item.id === formData.id ? formData : item)
      }));
      showAlert('Registro actualizado con éxito.');
    } else {
      // Create
      const newId = data[key].length > 0 ? Math.max(...data[key].map(i => i.id)) + 1 : 1;
      const newItem = { ...formData, id: newId };
      setData(prevData => ({
        ...prevData,
        [key]: [...prevData[key], newItem]
      }));
      showAlert('Registro creado con éxito.');
    }
    handleCloseFormModal();
  };
  
  const currentDefinition = definitions[key];

  return (
    <Container className="mt-4">
      <AlertaNotificacion 
        show={alert.show}
        message={alert.message}
        variant={alert.variant}
        onClose={() => setAlert({ ...alert, show: false })}
      />

      <h2>Gestión de Información Agrícola</h2>
      <p>Administra la información esencial sobre cultivos, fertilizantes y deficiencias nutricionales.</p>
      
      <BotonCrear onClick={handleShowFormModal} />

      <Tabs
        id="gestion-informacion-tabs"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        {Object.keys(definitions).map(tabKey => (
            <Tab eventKey={tabKey} title={definitions[tabKey].modalTitle} key={tabKey}>
                <TablaDatos 
                    columns={definitions[tabKey].columns}
                    data={data[tabKey]}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </Tab>
        ))}
      </Tabs>

      <ModalFormulario
        show={showFormModal}
        handleClose={handleCloseFormModal}
        handleSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        fields={currentDefinition.fields}
        title={`${isEditing ? 'Editar' : 'Crear'} ${currentDefinition.modalTitle}`}
      />

      <ModalConfirmacion 
        show={showConfirmModal}
        onHide={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmDelete}
        title="Confirmar Eliminación"
        message="¿Estás seguro de que quieres eliminar este registro?"
      />
    </Container>
  );
};

export default GestionInformacion;
