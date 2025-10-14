// components/usuarios/UserStatesCard.jsx
export default function UserStatesCards({ stats }) {
  return (
    <div className="row mb-4">
      <div className="col-md-3 mb-3">
        <div className="card border-0 shadow-sm">
          <div className="card-body text-center">
            <h6 className="card-subtitle mb-2 text-muted">Usuarios totales</h6>
            <h4 className="card-title">{stats.total}</h4>
          </div>
        </div>
      </div>
      <div className="col-md-3 mb-3">
        <div className="card border-0 shadow-sm">
          <div className="card-body text-center">
            <h6 className="card-subtitle mb-2 text-muted">Activos</h6>
            <h4 className="card-title text-success">{stats.active}</h4>
          </div>
        </div>
      </div>
      <div className="col-md-3 mb-3">
        <div className="card border-0 shadow-sm">
          <div className="card-body text-center">
            <h6 className="card-subtitle mb-2 text-muted">Nuevos este mes</h6>
            <h4 className="card-title text-info">{stats.new}</h4>
          </div>
        </div>
      </div>
      <div className="col-md-3 mb-3">
        <div className="card border-0 shadow-sm">
          <div className="card-body text-center">
            <h6 className="card-subtitle mb-2 text-muted">Suspendidos</h6>
            <h4 className="card-title text-danger">{stats.suspended}</h4>
          </div>
        </div>
      </div>
    </div>
  );
}