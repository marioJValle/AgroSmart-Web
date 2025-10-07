import React from 'react';
import logo from '../../assets/Img/AgroSmartLogoFinal.svg';

const Header = () => {
  return (
    <header className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <a className="navbar-brand" href="#">
          <img src={logo} alt="AgroSmart Logo" style={{ height: '40px' }} />
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
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="#features">Noticias</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#about">Estadisticas</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#contact">Login</a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;