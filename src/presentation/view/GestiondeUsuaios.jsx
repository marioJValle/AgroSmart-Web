import { useState, useEffect, useMemo } from "react";
import SearchBar from "../components/usuarios/SearchBar";
import UserStatesCards from "../components/usuarios/UserStatesCard";
import ActionButtons from "../components/usuarios/ActionButtons";
import UserManagementTable from "../components/usuarios/UserManagementTable";
import { UserRepository } from "../../data/repositories/userRepository/UserRepository";
import { GetAllUsers } from "../../domain/useCases/userUseCases/GetAllUsers";
import { getAuth } from "firebase/auth";



export default function UserManagementView() {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("Todos");
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [users, setUsers] = useState([]);
    const [sortBy, setSortBy] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc");
    const [editingUserId, setEditingUserId] = useState(null);
    const [editValues, setEditValues] = useState({});
    const [stats, setStats] = useState({
        total: 0,
        active: 0,
        new: 0,
        suspended: 0,
    });
    const auth = getAuth(); //
    const fauth = auth.currentUser;
    const avatarimg = fauth ? fauth.photoURL : "";// Obtener la foto de perfil del usuario autenticado, en prueba.


    //funcion para supender un usuario
    const handleSuspend = async () => {
        if (!selectedUserId) {
            alert("Por favor, seleccione un usuario para suspender.");
            return;
        }
        try {
            const userRepo = new UserRepository();
            await userRepo.updateUserField(selectedUserId, "status", "Suspendido");
            await fetchUsers();
            alert("Usuario suspendido con éxito.");
            setSelectedUserId(null);
        } catch (error) {
            console.error("Error suspending user:", error);
        }
    };


    //funcion para reactivar un usuario
    const handleReactivate = async (userId) => {
        if (!userId) {
            alert("Por favor, seleccione un usuario para reactivar.");
            return;
        }
        try {
            const userRepo = new UserRepository();
            await userRepo.updateUserField(userId, "status", "Activo");

            await fetchUsers();
            alert("Usuario reactivado con éxito.");
        } catch (error) {
            console.error("Error reactivating user:", error);
        }
    };


    //actulizar la lista de usuarios al cargar el componente
    useEffect(() => {
        fetchUsers();
    }, []);

    //funcion para obtener todos los usuarios
    const fetchUsers = async () => {
        try {
            const userRepo = new UserRepository();
            const getAllUsers = new GetAllUsers(userRepo);
            const usersList = await getAllUsers.execute();

            setUsers(usersList);

            // Calcular estadísticas
            const total = usersList.length;
            const active = usersList.filter((u) => u.status === "Activo").length;
            const suspended = usersList.filter((u) => u.status === "Suspendido").length;

            const currentMonth = new Date().getMonth();
            const newUsers = usersList.filter((u) => {
                if (!u.createdAt) return false;
                const created = u.createdAt.toDate ? u.createdAt.toDate() : new Date(u.createdAt);
                return created.getMonth() === currentMonth;
            }).length;

            setStats({ total, active, new: newUsers, suspended });
        } catch (error) {
            console.error("Error fetching users:", error);
            setUsers([]);
        }
    };

    const filteredUsers = useMemo(() => {
        let result = users;

        // 🔎 búsqueda
        result = result.filter((u) => {
            if (!u) return false;
            const searchTerm = search.toLowerCase();
            return (
                (u.username || "").toLowerCase().includes(searchTerm) ||
                (u.email || "").toLowerCase().includes(searchTerm) ||
                (u.role || "").toLowerCase().includes(searchTerm) ||
                (u.status || "").toLowerCase().includes(searchTerm)
            );
        });

        // 🟢 filtrar por estado
        if (filter !== "Todos") {
            result = result.filter((u) => u.status === filter);
        }

        // 🔀 ordenamiento
        if (sortBy) {
            result = [...result].sort((a, b) => {
                let valA = (a[sortBy] || "").toString().toLowerCase();
                let valB = (b[sortBy] || "").toString().toLowerCase();

                if (valA < valB) return sortOrder === "asc" ? -1 : 1;
                if (valA > valB) return sortOrder === "asc" ? 1 : -1;
                return 0;
            });
        }

        return result;
    }, [users, search, filter, sortBy, sortOrder]);


    const handleEdit = (user) => {
        setEditingUserId(user.id);
        setEditValues({
            ...user
        });
    };

    const handleSaveEdit = async () => {
        if (!editingUserId) return;
        try {
            const userRepo = new UserRepository();
            // actualiza con los nuevos valores editados
            const sanitizedValues = Object.fromEntries(
                Object.entries(editValues).filter(([_, v]) => v !== undefined)
            );

            await userRepo.updateUser(editingUserId, sanitizedValues);
            await fetchUsers();
            setEditingUserId(null);
            setEditValues({});
            alert("Usuario actualizado con éxito.");
        } catch (error) {
            console.error("Error updating user:", error);
        }

    };
    const cancelEdit = () => {
        setEditingUserId(null);
        setEditValues({});
    };

    return (
        <div>
            <div className="container mt-4">
                <h3 className="mb-4">Gestión de usuario</h3>
                <div className="row align-items-center mb-4">
                    <div className="col-md-6 w-50">
                        <SearchBar onSearch={setSearch}
                            setFilter={setFilter}
                            filter={filter}
                        />
                    </div>
                    <div className="col-md-6 d-flex justify-content-end">
                        <ActionButtons onSuspend={handleSuspend}
                            usersToExport={users}
                            sortBy={sortBy}
                            setSortBy={setSortBy}
                            sortOrder={sortOrder}
                            setSortOrder={setSortOrder}
                        />
                    </div>
                </div>
                <UserStatesCards stats={stats} />
                <UserManagementTable
                    users={filteredUsers}
                    selectedUserId={selectedUserId}
                    onSelectUser={setSelectedUserId}
                    onReactivate={handleReactivate}
                    editingUserId={editingUserId}
                    editValues={editValues}
                    setEditValues={setEditValues}
                    handleEdit={handleEdit}
                    avatarSrc={avatarimg}
                    handleSaveEdit={handleSaveEdit}
                    cancelEdit={cancelEdit}

                />
            </div>
        </div>
    );
}
