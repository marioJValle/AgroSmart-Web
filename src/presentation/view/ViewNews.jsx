import React, { useState, useEffect, useContext } from 'react';
import { FormularioPublicacionNovedades } from "../components/novedades/FormularioPublicacionNovedades";
import NewsList from "../components/novedades/NewsList";
import { UserContext } from '../context/UserContext';
import { NewsRepository } from '../../data/repositories/NewsRepository/NewsRepository';
import { News } from '../../domain/model/News';
import { Spinner } from 'react-bootstrap';

export default function ViewNews() {
  const { user, loading: userLoading } = useContext(UserContext);
  const [allNews, setAllNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('published');
  const [editingNews, setEditingNews] = useState(null); // State for the news item being edited

  const newsRepository = new NewsRepository();

  const fetchNews = async () => {
    if (!user) return;
    setLoading(true);
    const news = await newsRepository.getNews(user);
    setAllNews(news);
    setLoading(false);
  };

  useEffect(() => {
    if (!userLoading) {
      fetchNews();
    }
  }, [user, userLoading]);

  const handleSaveNews = async (formData, status) => {
    if (!user) return alert('Debes iniciar sesión para publicar.');

    if (editingNews) {
      // Update existing news
      const updatedData = { ...formData, status };
      await newsRepository.updateNews(editingNews.id, updatedData);
      setEditingNews(null); // Exit editing mode
      alert(`Noticia actualizada con éxito!`);
    } else {
      // Create new news
      const newsData = { ...formData, status, authorId: user.uid, authorRole: user.role };
      const news = new News(newsData);
      await newsRepository.createNews(news);
      alert(`Noticia guardada como ${status} con éxito!`);
    }
    fetchNews(); // Refresh list
  };

  const handleUpdateStatus = async (newsId, newStatus) => {
    await newsRepository.updateNews(newsId, { status: newStatus });
    fetchNews(); // Refresh list
  };

  const handleDelete = async (newsId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta noticia permanentemente?')) {
      await newsRepository.deleteNews(newsId);
      fetchNews(); // Refresh list
    }
  };

  const handleEdit = (newsItem) => {
    setEditingNews(newsItem);
  };

  const handleCancelEdit = () => {
    setEditingNews(null);
  };

  const filteredNews = allNews.filter(news => news.status === activeTab);

  if (userLoading) {
    return <div className="text-center mt-5"><Spinner animation="border" /></div>;
  }

  return (
    <div className="container mt-4">
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
                    <button className={`nav-link ${activeTab === 'drafts' ? 'active' : ''}`} onClick={() => setActiveTab('drafts')}>Borradores</button>
                </li>
                <li className="nav-item">
                    <button className={`nav-link ${activeTab === 'archived' ? 'active' : ''}`} onClick={() => setActiveTab('archived')}>Archivadas</button>
                </li>
            </ul>
            {loading ? (
                <div className="text-center p-5"><Spinner animation="border" /></div>
            ) : (
                <NewsList 
                    newsItems={filteredNews}
                    user={user}
                    onDelete={handleDelete}
                    onArchive={(newsId) => handleUpdateStatus(newsId, 'archived')}
                    onPublish={(newsId) => handleUpdateStatus(newsId, 'published')}
                    onEdit={handleEdit}
                />
            )}
        </div>
      </div>
    </div>
  );
}
