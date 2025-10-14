import React from "react";

const Hero = () => {
  return (
    <section className="hero-section text-center py-5">
      <div className="container">
        <h1 className="display-4">Bienvenidos a AgroSmart</h1>
        <p className="lead">
          Identifica Deficiencias Nutricionales en tus cultivos al Instante
        </p>
        <p className="mb-4">
          Diagnostico en tiempo real con tu Smartphone para optimizar la salud
          de tus cultivos.{" "}
        </p>
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg px-4 gap-3">Ver Demo</a>
          <a href="https://play.google.com/" target="_blank" rel="noopener noreferrer" className="btn btn-outline-secondary btn-lg px-4">Descargar App</a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
