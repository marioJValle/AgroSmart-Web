import React from "react";
import isotipo from "../../../assets/Img/Isotipo.svg";
import logotipo from "../../../assets/Img/Logotipo.svg";

const Phone = () => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="bg-dark rounded-5 p-2 shadow-lg">
        <div
          style={{ width: "240px", height: "500px" }}
          className="bg-white rounded-4 d-flex flex-column align-items-center"
        >
          {/* Status Bar */}
          <div className="d-flex justify-content-between align-items-center w-100 px-2 py-1" style={{ height: '20px', backgroundColor: '#f8f9fa', borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem' }}>
            {/* Camera */}
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#343a40' }}></div>
            {/* Signal and Battery */}
            <div className="d-flex align-items-center">
              {/* Signal */}
              <div className="d-flex me-2 align-items-end">
                <div style={{ width: '3px', height: '6px', backgroundColor: '#343a40', marginRight: '1px' }}></div>
                <div style={{ width: '3px', height: '8px', backgroundColor: '#343a40', marginRight: '1px' }}></div>
                <div style={{ width: '3px', height: '10px', backgroundColor: '#343a40' }}></div>
              </div>
              {/* Battery */}
              <div style={{ width: '18px', height: '10px', border: '1px solid #343a40', borderRadius: '2px', position: 'relative' }}>
                <div style={{ width: '14px', height: '8px', backgroundColor: '#28a745', position: 'absolute', top: '1px', left: '1px', borderRadius: '1px' }}></div>
                <div style={{ width: '2px', height: '4px', backgroundColor: '#343a40', position: 'absolute', top: '3px', right: '-3px', borderRadius: '1px' }}></div>
              </div>
            </div>
          </div>

          {/* Content (logos and cards) */}
          <div
            className="d-flex flex-column justify-content-center align-items-center" style={{ flexGrow: 1 }}
          >
            <img src={isotipo} alt="isotipo" style={{ width: "150px" }} />
            <img
              src={logotipo}
              alt="logotipo"
              style={{ width: "200px", marginTop: "20px" }}
            />
            <div className="d-flex flex-row justify-content-around align-items-center" style={{ width: '100%', marginTop: '74px' }}>
              <div className="card text-center shadow-sm mb-3 mx-1" style={{ borderRadius: '10px', border: '1px solid #ccc', width: '100px' }}>
                <div className="card-body p-2">
                  <h6 className="card-title mb-0" style={{ fontSize: '0.8rem' }}>Detección</h6>
                </div>
              </div>
              <div className="card text-center shadow-sm mb-3 mx-1" style={{ borderRadius: '10px', border: '1px solid #ccc', width: '100px' }}>
                <div className="card-body p-2">
                  <h6 className="card-title mb-0" style={{ fontSize: '0.8rem' }}>Deficiencias</h6>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Bar */}
          <div className="d-flex justify-content-around align-items-center w-100 py-2" style={{ height: '40px', backgroundColor: '#f8f9fa', borderBottomLeftRadius: '1rem', borderBottomRightRadius: '1rem' }}>
            {/* Back Button */}
            <div style={{ width: '18px', height: '18px', borderBottom: '2px solid #343a40', borderLeft: '2px solid #343a40', transform: 'rotate(45deg)', cursor: 'pointer' }}></div>
            {/* Home Button */}
            <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: '2px solid #343a40', cursor: 'pointer' }}></div>
            {/* Recents Button */}
            <div style={{ width: '22px', height: '22px', border: '2px solid #343a40', borderRadius: '3px', cursor: 'pointer' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Phone;
