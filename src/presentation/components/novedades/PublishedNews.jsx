import React, { useEffect, useState } from "react";
import { NewsRepositoryImpl } from "../../../data/repositories/NewsRepository/NewsRepository";
import { GetAllNews } from "../../../domain/useCases/newsUseCases/GetAllNews";

export default function PublishedNews() {

  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    try {
    const fetchNoticias = async () => {
      const newsRepo = new NewsRepositoryImpl();
      const getAllNews = new GetAllNews(newsRepo);
      const news = await getAllNews.execute();
      setNoticias(news);
    };
  } catch (error) {
    console.error("Error fetching news:", error);
    setNoticias([]);
  }

    fetchNoticias();
  }, []);


  return (
    <div className="container mt-4">
      {/* Búsqueda y filtro */}
      <div className="d-flex mb-3 gap-2">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar noticia..."
        />
        <select className="form-select" style={{ maxWidth: "150px" }}>
          <option value="all">Todas</option>
          <option value="recientes">Recientes</option>
          <option value="antiguas">Antiguas</option>
        </select>
      </div>

      <h5 className="mb-3">Noticias publicadas</h5>

      {/* Lista de noticias */}
      <div className="list-group">
        {noticias.map((noticia) => (
          <div
            key={noticia.id}
            className="list-group-item d-flex align-items-center justify-content-between border rounded mb-2"
          >
            {/* Imagen + texto */}
            <div className="d-flex align-items-center">
              {noticia.imageBytes ? (
                <img
                  src={noticia.imageBytes}
                  alt="imagen"
                  className="rounded me-3"
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                />
              ) : (
                <div
                  className="bg-light rounded me-3"
                  style={{ width: "50px", height: "50px" }}
                ></div>
              )}

              <div>
                <h6 className="mb-1 fw-bold">{noticia.title}</h6>
                <small className="text-muted">
                  {noticia.date.toLocaleDateString()} • {noticia.description}
                </small>
              </div>
            </div>

            {/* Botones */}
            <div className="d-flex gap-2">
              <button className="btn btn-outline-success btn-sm d-flex align-items-center">
                <i className="bi bi-pencil me-1"></i> Editar
              </button>
              <button className="btn btn-outline-danger btn-sm d-flex align-items-center">
                <i className="bi bi-trash me-1"></i> Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}