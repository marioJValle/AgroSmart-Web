import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import ManualAgricultor from "../../../assets/Document/🌾 Manual de Usuario Agricultor.pdf";
import ManualAdministrador from "../../../assets/Document/Manual de usuario Administrador.pdf";
import ManualInstituciones from "../../../assets/Document/Manual de usuario Instituciones.pdf";

const Hero = () => {
  const { user } = useContext(UserContext);

  const handleDownload = () => {
    if (!user) {
      // Or handle this case as you see fit, e.g., show a message
      return;
    }
    let manualUrl;
    switch (user.role) {
      case "Agricultor":
        manualUrl = ManualAgricultor;
        break;
      case "Administrador":
        manualUrl = ManualAdministrador;
        break;
      case "Institucion":
        manualUrl = ManualInstituciones;
        break;
      default:
        return;
    }

    const link = document.createElement("a");
    link.href = manualUrl;
    link.setAttribute("download", manualUrl.split("/").pop());
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
        <div className="d-flex flex-column align-items-center">
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-3">
            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-lg px-4 gap-3"
            >
              Ver Demo
            </a>
            <a
              href="https://play.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-secondary btn-lg px-4"
            >
              Descargar App
            </a>
          </div>
          <button
            className="btn btn-outline-secondary btn-lg px-4"
            style={{ backgroundColor: "#b2e619" }}
            onClick={handleDownload}
          >
            Manual de usuario
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
