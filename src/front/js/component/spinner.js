import React from "react";


const Spinner = () => {
  return (
    <div className="spinner-container d-flex flex-column align-items-center justify-content-center">
      <div className="spinner-border text-dark" role="status">
        <span className="visually-hidden">...</span>
      </div>
      <h3>Procesando...</h3>
    </div>
  );
};

export default Spinner;