import React from "react";
import isotipo from "../../assets/Img/Isotipo.svg";
import logotipo from "../../assets/Img/Logotipo.svg";

const Phone = () => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="bg-dark rounded-5 p-2 shadow-lg">
        <div
          style={{ width: "230px", height: "480px" }}
          className="bg-white rounded-4 d-flex flex-column justify-content-center align-items-center"
        >
          <div
            style={{ height: "450px" }}
            className="d-flex flex-column justify-content-center align-items-center"
          >
            <img src={isotipo} alt="isotipo" style={{ width: "150px" }} />
            <img
              src={logotipo}
              alt="logotipo"
              style={{ width: "200px", marginTop: "20px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Phone;
