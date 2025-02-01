import React from "react";
import "../../styles/footer.css"; 

export const Footer = () => {
  const iniciarAsesoria = () => {
    window.open("https://wa.me/59891744816", "_blank");
  };

  const abrirOutlook = () => {
    window.location.href = "mailto:espacionovem@gmail.com?subject=Asesoría Nutricional";
  };

  return (
    <footer className="footer">
      <div className="footer-title">
        <p>Espacio Novem</p>
        <p>Contacto</p>
      </div>
      <div className="footer-content">
        <div className="footer-item" onClick={iniciarAsesoria}>
          <i className="fa-brands fa-whatsapp"></i>
          <p>Whatsapp</p>
        </div>
        <div className="footer-item" onClick={abrirOutlook}>
          <i className="fa-regular fa-envelope"></i>
          <p>Correo Electrónico</p>
        </div>
      </div>
    </footer>
  );
};
