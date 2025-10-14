export default function SearchBar({ onSearch ,setFilter, filter}) {
  return (
    <div className="d-flex align-items-center mb-4">
      {/* Barra de búsqueda */}
      <div className="input-group me-3" style={{ maxWidth: "400px" }}>
        <input
          type="text"
          className="form-control"
          placeholder="Buscar usuario..."
          onChange={(e) => onSearch(e.target.value)}
        />
        <button className="btn btn-outline-secondary" type="button">
          <i className="bi bi-search"></i>
        </button>
      </div>

      {/* Botones de estado */}
      <div className="btn-group" role="group">
        <button type="button" className={`btn ${filter === "Todos" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setFilter("Todos")}
        >
          Todos
        </button>
        <button className={`btn ${filter === "Activo" ? "btn-success" : "btn-outline-success"}`}
          onClick={() => setFilter("Activo")}>
          Activos
        </button>
        <button type="button" className={`btn ${filter === "Suspendido" ? "btn-danger" : "btn-outline-danger"}`}
          onClick={() => setFilter("Suspendido")}>
          Suspendidos
        </button>
      </div>
    </div>
  );
}
