// components/usuarios/Pagination.jsx
export default function Pagination({ page, totalPages }) {
  return (
    <div className="d-flex justify-content-between align-items-center mb-4">
      <div>
        <button className="btn btn-light btn-sm me-2">&laquo;</button>
        <button className="btn btn-light btn-sm me-2">&lt;</button>
        <span className="mx-2">Página {page} de {totalPages}</span>
        <button className="btn btn-light btn-sm me-2">&gt;</button>
        <button className="btn btn-light btn-sm">&raquo;</button>
      </div>
    </div>
  );
}