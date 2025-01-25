import React from "react";
import consultorio3 from "../../img/consultorio3.webp";

export const Consultorio3 = () => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="card" style={{ width: "30rem" }}>
        <img src={consultorio3} className="card-img-top" alt="Consultorio 1" />
        <div className="card-body">
          <h5 className="card-title">Consultorio 3</h5>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <a href="/" className="btn btn-primary">
            Atrás
          </a>
        </div>
      </div>
    </div>
  );
};
