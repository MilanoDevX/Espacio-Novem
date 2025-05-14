import React from "react";
import "../../styles/footerLogin.css"; 

export const FooterLogin = () => {
  const iniciarChat = () => {
    window.open("https://wa.me/59899123456", "_blank");
  };
  
  const abrirOutlook = () => {
    window.location.href = "mailto:psicoespacio@example.com?subject=";
  };
  
  return (
    <footer className="footerLogin">
      <div className="footerLogin-title">
        <p>PsicoEspacio</p>
        <p>Contacto</p>
      </div>
      <div className="footerLogin-content">
        <div className="footerLogin-item" onClick={iniciarChat}>
          <i className="fa-brands fa-whatsapp"></i>
          <p>Whatsapp</p>
        </div>
        <div className="footerLogin-item" onClick={abrirOutlook}>
          <i className="fa-regular fa-envelope"></i>
          <p>Correo Electrónico</p>
        </div>
      </div>
      <div className="footer-credit mt-3">
  <p>
    Sitio desarrollado por el equipo de{" "}
    <a
      href="https://novem-devteam.onrender.com"
      target="_blank"
      rel="noopener noreferrer"
    >
      DevTeam
    </a>
  </p>
</div>
    </footer>
  );
};
