import React from "react";

const About = () => {
  return (
    <section id="about" className="about-section py-5 bg-light">
      <div className="container">
        <h2 className="text-center mb-5">Sobre AgroSmart</h2>
        <div className="row">
          <div className="col-md-6 mb-4">
            <div className="card shadow-lg h-100">
              <div className="card-body">
                <p className="card-text">
                  AgroSmart una plataforma inteligente que permite a los productores
                  agrícolas detectar deficiencias nutricionales en los cultivos a
                  través de imágenes y análisis con inteligencia artificial. Nuestro
                  objetivo es optimizar la salud de los cultivos, mejorar la
                  productividad y reducir el uso de agroquímicos, promoviendo
                  prácticas agrícolas sostenibles y responsables.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="card shadow-lg h-100">
              <div className="card-body">
                <p className="card-text">
                  Recopila información del terreno, analiza el estado de las plantas
                  y genera recomendaciones precisas sobre fertilización y manejo
                  agrícola. Con AgroSmart, los agricultores pueden optimizar
                  recursos, mejorar el rendimiento y tomar decisiones basadas en
                  datos reales.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
