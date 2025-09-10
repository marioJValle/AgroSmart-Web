import { FormularioPublicacionNovedades } from "../components/FormularioPublicacionNovedades";
import PublishedNews from "../components/PublishedNews";

export default function ViewNews() {
  return (
    <div className="container mt-4">
      {/* Tabs */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button className="nav-link active">Publicadas</button>
        </li>
        <li className="nav-item">
          <button className="nav-link">Borradores</button>
        </li>
        <li className="nav-item">
          <button className="nav-link">Archivadas</button>
        </li>
      </ul>

      <div className="row">
        {/* Columna izquierda - Formulario */}
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title mb-3">Nueva noticia</h5>
              <FormularioPublicacionNovedades />
            </div>
          </div>
        </div>

        {/* Columna derecha - Noticias */}
        <div className="col-md-8">
          <div className="card shadow-sm">
            <PublishedNews />
          </div>
        </div>
      </div>
    </div>

  );
}
