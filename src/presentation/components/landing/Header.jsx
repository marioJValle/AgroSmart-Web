import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext.jsx";
import { auth } from "../../../data/database/Firebase";
import logo from "../../../assets/Img/ImagotipoAgroSmart.png";

const Header = () => {
  const { user } = useContext(UserContext);

  const handleLogout = () => {
    auth.signOut();
  };

  // ✅ Botones visibles según el rol del usuario
  const renderNavLinks = () => {
    if (!user) {
      // Usuario no autenticado
      return (
        <>
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Inicio
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </li>
        </>
      );
    }

    // Usuario autenticado — mostrar enlaces según su rol
    switch (user.role) {
      case "Administrador":
        return (
          <>
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard/news">
                Noticias
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard/user-management">
                Gestión de Usuarios
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard/informacion-agricola">
                Gestión Agrícola
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard/estadisticas">
                Estadísticas
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard/photografy-data">
                Datos Fotográficos
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard/profile">
                Perfil
              </Link>
            </li>
          </>
        );

      case "Institucion":
        return (
          <>
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard/news">
                Noticias
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard/estadisticas">
                Estadísticas
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard/profile">
                Perfil
              </Link>
            </li>
          </>
        );

      case "Agricultor":
        return (
          <>
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/mis-cultivos">
                Mis Cultivos
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard/profile">
                Perfil
              </Link>
            </li>
          </>
        );

      default:
        return (
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Inicio
            </Link>
          </li>
        );
    }
  };

  return (
    <header
      className="navbar navbar-expand-lg navbar-light"
      style={{ backgroundColor: "#E2FF36" }}
    >
      <div className="container">
        <a className="navbar-brand" href="#">
          <img src={logo} alt="AgroSmart Logo" style={{ height: "40px" }} />
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            {renderNavLinks()}
            {user && (
              <li className="nav-item ms-3">
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
