import { UserContext } from '../context/UserContext';
import { FormularioPublicacionNovedades } from "../components/novedades/FormularioPublicacionNovedades";
import NewsList from "../components/novedades/NewsList";
import { News } from '../../domain/model/News';
import { Spinner, Alert } from 'react-bootstrap';
import AlertaNotificacion from '../components/gestionInformacion/AlertaNotificacion';
import ModalConfirmacion from '../components/gestionInformacion/ModalConfirmacion';
import GetNews from '../../domain/useCases/newsUseCases/GetNews';
import CreateNews from '../../domain/useCases/newsUseCases/CreateNews';
import UpdateNews from '../../domain/useCases/newsUseCases/UpdateNews';
import DeleteNews from '../../domain/useCases/newsUseCases/DeleteNews';
import { useContext, useEffect, useState } from 'react';
import SearchBar from '../components/gestionInformacion/SearchBar';

export default function ViewNews() {
  const { user, loading: userLoading } = useContext(UserContext);
  const [allNews, setAllNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('published');
  const [editingNews, setEditingNews] = useState(null);
  const [notification, setNotification] = useState({ show: false, message: '', variant: 'success' });
  const [itemToDelete, setItemToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const showNotification = (message, variant = 'success') => {
    setNotification({ show: true, message, variant });
  };

  const fetchNews = async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      const news = await GetNews(user);
      setAllNews(news);
    } catch (e) {
      console.error("Error fetching news:", e);
      setError('No se pudieron cargar las noticias. Es posible que falten índices en la base de datos. Revisa la consola del navegador para más detalles.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userLoading) {
      fetchNews();
    }
  }, [user, userLoading]);

  const handleSaveNews = async (formData, status) => {
    if (!user) return showNotification('Debes iniciar sesión para publicar.', 'danger');

    if (editingNews) {
      const updatedData = { ...formData, status, date: new Date() };
      await UpdateNews(editingNews.id, updatedData);
      setEditingNews(null);
      showNotification(`Noticia actualizada con éxito!`);
    } else {
      const newsData = { ...formData, status, authorId: user.uid, authorRole: user.role };
      const news = new News(newsData);
      await CreateNews(news);
      showNotification(`Noticia guardada como ${status} con éxito!`);
    }
    fetchNews();
  };

  const handleUpdateStatus = async (newsId, newStatus) => {
    await UpdateNews(newsId, { status: newStatus, date: new Date() });
    showNotification(`Noticia movida a ${newStatus === 'published' ? 'publicadas' : 'archivadas'}.`);
    fetchNews();
  };

  const handleDelete = (newsId) => setItemToDelete(newsId);
  const handleConfirmDelete = async () => {
    if (itemToDelete) {
      await DeleteNews(itemToDelete);
      showNotification('Noticia eliminada con éxito.', 'danger');
      fetchNews();
    }
    setItemToDelete(null);
  };

  const handleEdit = (newsItem) => setEditingNews(newsItem);
  const handleCancelEdit = () => setEditingNews(null);

  const renderContent = () => {
    if (loading) return <div className="text-center p-5"><Spinner animation="border" /></div>;
    if (error) return <Alert variant="danger">{error}</Alert>;

    // 🔍 Filtrar por estado (published, draft, archived)
    let filteredNews = allNews.filter(news => news.status === activeTab);

    // 🔍 Filtrar por texto del buscador (título, contenido, etc.)
    if (searchQuery.trim() !== '') {
      const normalize = (str) =>
        str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

      filteredNews = filteredNews.filter(news =>
        (news.title && normalize(news.title).includes(normalize(searchQuery))) ||
        (news.content && normalize(news.content).includes(normalize(searchQuery)))
      );

    }

    return (
      <>
        <SearchBar
          onSearch={setSearchQuery}
          placeholder={`Buscar en novedades...`}
        />
        <NewsList
          newsItems={filteredNews}
          user={user}
          onDelete={handleDelete}
          onArchive={(newsId) => handleUpdateStatus(newsId, 'archived')}
          onPublish={(newsId) => handleUpdateStatus(newsId, 'published')}
          onEdit={handleEdit}
        />
      </>
    );
  };


  if (userLoading) return <div className="text-center mt-5"><Spinner animation="border" /></div>;

  return (
    <div className="container mt-4">
      <AlertaNotificacion {...notification} onClose={() => setNotification({ ...notification, show: false })} />
      <ModalConfirmacion
        show={itemToDelete !== null}
        onHide={() => setItemToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Confirmar Eliminación"
        message="¿Estás seguro de que quieres eliminar esta noticia permanentemente? Esta acción no se puede deshacer."
      />
      <div className="row">
        <div className="col-lg-4 mb-4">
          <FormularioPublicacionNovedades
            user={user}
            initialData={editingNews}
            onSave={handleSaveNews}
            onCancelEdit={handleCancelEdit}
          />
        </div>
        <div className="col-lg-8">
          <ul className="nav nav-tabs mb-3">
            <li className="nav-item">
              <button className={`nav-link ${activeTab === 'published' ? 'active' : ''}`} onClick={() => setActiveTab('published')}>Publicadas</button>
            </li>
            <li className="nav-item">
              <button className={`nav-link ${activeTab === 'draft' ? 'active' : ''}`} onClick={() => setActiveTab('draft')}>Borradores</button>
            </li>
            <li className="nav-item">
              <button className={`nav-link ${activeTab === 'archived' ? 'active' : ''}`} onClick={() => setActiveTab('archived')}>Archivadas</button>
            </li>
          </ul>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
