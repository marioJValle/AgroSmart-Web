import React from 'react';

const Features = () => {
  return (
    <section id="features" className="features-section py-5">
      <div className="container">
        <h2 className="text-center mb-5">Funcionalidades</h2>
        <div className="row">
          <div className="col-md-4">
            <div className="card text-center">
              <div className="card-body">
                <h5 className="card-title">Modelo de maching learning</h5>
                <p className="card-text">Detecta deficiencias nutricionales mediante análisis de imágenes y síntomas con alta precisión diagnóstica.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-center">
              <div className="card-body">
                <h5 className="card-title">Diagnostico en tiempo real</h5>
                <p className="card-text"></p>Diagnóstico nutricional instantáneo mediante inteligencia artificial que analiza síntomas y ofrece recomendaciones personalizadas en segundos.
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-center">
              <div className="card-body">
                <h5 className="card-title">Recomendaciones personalizadas</h5>
                <p className="card-text">Recomendaciones nutricionales personalizadas basadas en tus necesidades específicas y objetivos de salud, actualizadas constantemente.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
