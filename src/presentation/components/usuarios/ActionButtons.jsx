import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function ActionButtons({ onSuspend, usersToExport, sortBy, setSortBy, sortOrder, setSortOrder }) {

  //funcion para exportar los usuarios a excel
  const exportToExcel = () => {
    if (!Array.isArray(usersToExport) || usersToExport.length === 0) {
      alert("No hay usuarios para exportar.");
      return;
    }

    const data = usersToExport.map((user) => ({
      Usuario: user.username || "",
      Email: user.email || "",
      Rol: user.role || "",
      Estado: user.status || "",
      Telefono: user.phoneNumber || "",
      Municipio: user.municipality || "",
      Tipo_de_Suelo: Array.isArray(user.soilTypes)
        ? user.soilTypes.join(", ")
        : user.soilTypes || "",
      "Último Acceso": user.ultimoAcceso || "",
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Usuarios");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "usuarios.xlsx");

    alert("Usuarios exportados con éxito.");
  };
  return (
    <div className="d-flex justify-content-end mb-4">
      <div className="row g-2" style={{ width: "350px" }}>
        <div className="col-6">
          <button
            type="button"
            className="btn w-100"
            style={{ backgroundColor: "#F4F4F4", color: "black", border: "1px solid black" }}
            onClick={exportToExcel}
          >
            Exportar
          </button>
        </div>
        <div className="col-6">
          <button type="button" className="btn w-100"
            style={{ backgroundColor: "#F8AB4C", color: "white" }}
            onClick={() => {
              if (window.confirm("¿Seguro que quieres suspender este usuario?")) {
                onSuspend();
              }
            }}
          >
            Suspender usuario
          </button>
        </div>
        <div className="col-6">
          {/* Ordenar por */}
          <select
            className="form-select"
            value={sortBy || ""}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">Ordenar por...</option>
            <option value="username">Nombre</option>
            <option value="role">Rol</option>
          </select>
        </div>
        <div className="col-6">
          {/* Ordenar dirección */}
          <select
            className="form-select"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
          </select>
        </div>
      </div>
    </div>
  );
}
