import React from "react";


const Spinner = () => {
  return (
    <div className="spinner-container">
      <div className="spinner-border text-dark" role="status">
        <span className="visually-hidden">Espere...</span>
      </div>
    </div>
  );
};

export default Spinner;