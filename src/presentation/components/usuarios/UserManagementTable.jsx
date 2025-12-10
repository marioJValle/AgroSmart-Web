import Pagination from "./Pagination";
import { format } from "date-fns";
import placeholderAvatar from "../../../assets/Img/Isotipo.svg";

export default function UserManagementTable({
  users,
  selectedUserId,
  onSelectUser,
  onReactivate,
  editingUserId,
  editValues,
  setEditValues,
  handleEdit,
  handleSaveEdit,
  cancelEdit,
}) {
  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <div className="table-responsive">
          <table className="table align-middle table-bordered text-center">
            <thead className="table-light">
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Estado</th>
                <th>Último acceso</th>
                <th>Acciones</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users && users.length > 0 ? (
                users.map((user) => (
                  <tr
                    key={user.id}
                    className={
                      user.estado === "Activo"
                        ? "table-success"
                        : "table-warning"
                    }
                  >
                    <td>
                      <img
                        src={user.photoURL || placeholderAvatar}
                        alt="avatar"
                        className="rounded-circle me-2"
                        width="40"
                        height="40"
                      />
                      {editingUserId === user.id ? (
                        <input
                          type="text"
                          className="form-control"
                          value={editValues.username || ""}
                          onChange={(e) =>
                            setEditValues({
                              ...editValues,
                              username: e.target.value,
                            })
                          }
                        />
                      ) : (
                        user.username
                      )}
                    </td>
                    <td>
                      {editingUserId === user.id ? (
                        <input
                          type="email"
                          className="form-control"
                          value={editValues.email || ""}
                          onChange={(e) =>
                            setEditValues({
                              ...editValues,
                              email: e.target.value,
                            })
                          }
                        />
                      ) : (
                        user.email
                      )}
                    </td>
                    <td>
                      {editingUserId === user.id ? (
                        <select
                          className="form-select"
                          value={editValues.role || ""}
                          onChange={(e) =>
                            setEditValues({
                              ...editValues,
                              role: e.target.value,
                            })
                          }
                        >
                          <option value="Administrador">Administrador</option>
                          <option value="Agricultor">Agricultor</option>
                          <option value="Institucion">Institucion</option>
                        </select>
                      ) : (
                        user.role
                      )}
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          user.status === "Activo" ? "bg-success" : "bg-warning"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td>
                      {user.lastSignInTime
                        ? format(new Date(user.lastSignInTime), "dd/MM/yyyy p")
                        : "-"}
                    </td>
                    <td>
                      {editingUserId === user.id ? (
                        <>
                          <button
                            className="btn btn-success btn-sm me-2"
                            onClick={handleSaveEdit}
                          >
                            Guardar
                          </button>
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={cancelEdit}
                          >
                            Cancelar
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="btn btn-primary btn-sm me-2"
                            onClick={() => handleEdit(user)}
                          >
                            Editar
                          </button>
                          {user.status === "Suspendido" && (
                            <button
                              className="btn btn-warning btn-sm"
                              onClick={() => onReactivate(user.id)}
                            >
                              Reactivar
                            </button>
                          )}
                        </>
                      )}
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="selectedUser"
                        checked={selectedUserId === user.id}
                        onChange={() => onSelectUser(user.id)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    No hay usuarios para mostrar
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination page={1} totalPages={1} />
    </div>
  );
}
