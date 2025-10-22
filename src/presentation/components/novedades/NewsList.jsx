import React from 'react';

// Componente "tonto" que solo renderiza la lista de noticias que recibe
export default function NewsList({ newsItems, user, onDelete, onArchive, onPublish, onEdit }) {

  const renderButtons = (news) => {
    const isAuthor = user && user.uid === news.authorId;
    const isAdmin = user && user.role === 'Administrador';

    if (!isAuthor && !isAdmin) {
      return null; // No mostrar botones si no es el autor ni admin
    }

    switch (news.status) {
      case 'published':
        return (
          <>
            <button className="btn btn-outline-primary btn-sm" onClick={() => onEdit(news)}>Editar</button>
            <button className="btn btn-outline-secondary btn-sm" onClick={() => onArchive(news.id)}>Archivar</button>
            <button className="btn btn-outline-danger btn-sm" onClick={() => onDelete(news.id)}>Eliminar</button>
          </>
        );
      case 'draft':
        return (
          <>
            <button className="btn btn-outline-primary btn-sm" onClick={() => onEdit(news)}>Editar</button>
            <button className="btn btn-outline-success btn-sm" onClick={() => onPublish(news.id)}>Publicar</button>
            <button className="btn btn-outline-secondary btn-sm" onClick={() => onArchive(news.id)}>Archivar</button>
            <button className="btn btn-outline-danger btn-sm" onClick={() => onDelete(news.id)}>Eliminar</button>
          </>
        );
      case 'archived':
        return (
          <>
            <button className="btn btn-outline-primary btn-sm" onClick={() => onEdit(news)}>Editar</button>
            <button className="btn btn-outline-success btn-sm" onClick={() => onPublish(news.id)}>Desarchivar</button>
            <button className="btn btn-outline-danger btn-sm" onClick={() => onDelete(news.id)}>Eliminar</button>
          </>
        );
    };

    if (newsItems.length === 0) {
      return <div className="text-center text-muted p-5">No hay noticias en esta sección.</div>;
    }

    return (
      <div className="list-group">
        {newsItems.map((noticia) => (
          <div
            key={noticia.id}
            className="list-group-item d-flex align-items-center justify-content-between border rounded mb-2"
          >
            <div className="d-flex align-items-center">
              {noticia.imageBytes ? (
                <img
                  src={noticia.imageBytes}
                  alt={noticia.title}
                  className="rounded me-3"
                  style={{ width: "60px", height: "60px", objectFit: "cover" }}
                />
              ) : (
                <div className="bg-light rounded me-3" style={{ width: "60px", height: "60px" }}></div>
              )}
              <div>
                <h6 className="mb-1 fw-bold">{noticia.title}</h6>
                <small className="text-muted">
                  {noticia.date.toLocaleDateString()} • por {noticia.author}
                </small>
                {user && user.role === 'Administrador' && noticia.authorRole === 'Institucion' && (
                  <span className="badge bg-info-subtle text-info-emphasis rounded-pill ms-2">Institución</span>
                )}
              </div>
            </div>
            <div className="d-flex gap-2">
              {renderButtons(noticia)}
            </div>
          </div>
        ))}
      </div>
    );
  }
}