
import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Container } from 'react-bootstrap';
import TablaDatos from '../components/gestionInformacion/TablaDatos';
import BotonCrear from '../components/gestionInformacion/BotonCrear';
import ModalFormulario from '../components/gestionInformacion/ModalFormulario';
import ModalConfirmacion from '../components/gestionInformacion/ModalConfirmacion';
import AlertaNotificacion from '../components/gestionInformacion/AlertaNotificacion';
import { cultivosManager } from '../../domain/useCases/cultivosUseCases/cultivosManager';
import { fertilizantesManager } from '../../domain/useCases/fertilizantesUseCases/fertilizantesManager';
import { deficienciasManager } from '../../domain/useCases/deficienciasUseCases/deficienciasManager';
import SearchBar from '../components/gestionInformacion/SearchBar';


// Column and Field Definitions
const definitions = {
  cultivos: {
    columns: [
      { header: 'Imagen', key: 'imageCrop' }, // Nueva columna para la imagen
      { header: 'Nombre', key: 'name' },
      { header: 'Descripción', key: 'description' },
      { header: 'Tipo', key: 'type' },
      { header: 'Tiempo de cosecha', key: 'harvestTime' },
    ],
    fields: [
      { label: 'Nombre del Cultivo', name: 'name', type: 'text' },
      { label: 'Descripción', name: 'description', type: 'text' },
      { label: 'Tipo', name: 'type', type: 'text' },
      { label: 'Tiempo de Cosecha', name: 'harvestTime', type: 'text' },
    ],
    modalTitle: 'Cultivo',
    imageField: 'imageCrop' // Campo para la imagen
  },
  fertilizantes: {
    columns: [
      { header: 'Imagen', key: 'imageFertilizers' }, // Nueva columna para la imagen
      { header: 'Nombre', key: 'name' },
      { header: 'Tipo', key: 'type' },
      { header: 'Descripción', key: 'description' },
      { header: 'Dosis', key: 'recommendedDose' },
      { header: 'Proveedor', key: 'supplier' },
      { header: 'Metodo de aplicacion', key: 'applicationMethod' },
    ],
    fields: [
      { label: 'Nombre del Fertilizante', name: 'name', type: 'text' },
      { label: 'Tipo', name: 'type', type: 'text' },
      { label: 'Descripción', name: 'description', type: 'text' },
      { label: 'Dosis Recomendada', name: 'recommendedDose', type: 'text' },
      { label: 'Proveedor', name: 'supplier', type: 'text' },
      { label: 'Metodo de aplicacion', name: 'applicationMethod', type: 'text' },
    ],
    modalTitle: 'Fertilizante',
    imageField: 'imageFertilizers' // Campo para la imagen
  },
  deficiencias: {
    columns: [
      { header: 'Imagen', key: 'imageDeficiencies' }, // Nueva columna para la imagen
      { header: 'Título', key: 'title' },
      { header: 'Descripción', key: 'description' },
      { header: 'Síntomas', key: 'symptoms' },
      { header: 'Soluciones', key: 'solutions' },
    ],
    fields: [
      { label: 'Título', name: 'title', type: 'text' },
      { label: 'Descripción', name: 'description', type: 'text' },
      { label: 'Síntomas', name: 'symptoms', type: 'text' },
      { label: 'Soluciones', name: 'solutions', type: 'text' },
    ],
    modalTitle: 'Deficiencia Nutricional',
    imageField: 'imageDeficiencies' // Campo para la imagen
  }
};



const useCases = {
  cultivos: cultivosManager,
  fertilizantes: fertilizantesManager,
  deficiencias: deficienciasManager,
};

const GestionInformacion = () => {
  const [key, setKey] = useState('cultivos');
  const [data, setData] = useState({ cultivos: [], fertilizantes: [], deficiencias: [] });
  const [showFormModal, setShowFormModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', variant: 'success' });
  const [searchQuery, setSearchQuery] = useState(''); // Estado para la búsqueda

  useEffect(() => {
    const fetchData = async () => {
      console.log(`Fetching data for key: ${key}`);
      const result = await useCases[key].getAll();
      console.log(`Fetched data for ${key}:`, result);
      setData(prevData => ({ ...prevData, [key]: result }));
    };
    fetchData();
  }, [key]);

  // Filtrar datos según la búsqueda
  const filteredData = data[key].filter(item =>
    Object.values(item).some(value =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

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
    console.log("🔄 Editando item:", item); // Debug

    // ✅ Asegurar que el item tiene ID válido
    if (!item || !item.id) {
      console.error("❌ No se puede editar: item sin ID válido", item);
      showAlert('Error: No se puede editar este registro (ID no válido)', 'danger');
      return;
    }

    setIsEditing(true);
    setFormData({ ...item }); // ✅ Hacer copia del objeto completo
    setShowFormModal(true);
  };

  const handleDelete = (item) => {
    console.log("🗑️ Item a eliminar recibido:", item); // Debug
    setItemToDelete(item);
    setShowConfirmModal(true);
  };


  const handleConfirmDelete = async () => {
    // ✅ Validar que itemToDelete existe y tiene ID
    if (!itemToDelete) {
      showAlert('Error: No se puede eliminar el registro', 'danger');
      setShowConfirmModal(false);
      setItemToDelete(null);
      return;
    }

    // ✅ Extraer el ID del objeto (itemToDelete es el objeto completo)
    const idToDelete = itemToDelete.id;

    if (!idToDelete) {
      showAlert('Error: No se puede eliminar el registro (ID no encontrado)', 'danger');
      setShowConfirmModal(false);
      setItemToDelete(null);
      return;
    }

    console.log(`Attempting to delete item with ID: ${idToDelete} from ${key}`);

    try {
      await useCases[key].delete(idToDelete); // ✅ Pasar solo el ID string
      const result = await useCases[key].getAll();
      setData(prevData => ({ ...prevData, [key]: result }));
      setShowConfirmModal(false);
      setItemToDelete(null);
      showAlert('Registro eliminado con éxito.', 'danger');
    } catch (error) {
      console.error('Error al eliminar:', error);
      showAlert('Error al eliminar el registro: ' + error.message, 'danger');
      setShowConfirmModal(false);
      setItemToDelete(null);
    }
  };

  const handleSubmit = async () => {
    try {
      if (isEditing) {
        // ✅ Validación más robusta del ID
        if (!formData.id || formData.id === "null" || formData.id === "undefined") {
          console.error('❌ No se puede actualizar: ID no válido', formData);
          showAlert('Error: No se puede actualizar el registro (ID no válido)', 'danger');
          return;
        }

        // console.log(`Attempting to update item with ID: ${formData.id} in ${key} with data:`, formData);
        await useCases[key].update(formData.id, formData);
        showAlert('Registro actualizado con éxito.');
      } else {
        // console.log(`Attempting to create new item in ${key} with data:`, formData);
        await useCases[key].create(formData);
        showAlert('Registro creado con éxito.');
      }

      const result = await useCases[key].getAll();
      setData(prevData => ({ ...prevData, [key]: result }));
      handleCloseFormModal();
      // console.log(`Submit successful. New data for ${key}:`, result);
    } catch (error) {
      console.error('Error en submit:', error);
      showAlert('Error al guardar el registro: ' + error.message, 'danger');
    }
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

      <SearchBar 
        onSearch={setSearchQuery} 
        placeholder={`Buscar en ${definitions[key].modalTitle}...`}
      />

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
              data={filteredData} // Usar datos filtrados
              onEdit={handleEdit}
              onDelete={handleDelete}
              searchQuery={searchQuery} // Pasar la consulta para el mensaje de "no hay datos"
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
        imageField={currentDefinition.imageField} // Pasar el campo de imagen
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
