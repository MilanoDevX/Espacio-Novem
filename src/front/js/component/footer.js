import React from "react";
import "../../styles/footer.css"; 
export const Footer = () => (
  <footer className="footer">
    <div className="footer-title">
      <p>Espacio Novem</p>
    </div>
    <div className="footer-content">
      <div className="footer-item">
        <i className="fa-brands fa-whatsapp"></i>
        <p>+598 91 744 816</p>
      </div>
      <div className="footer-item">
        <i className="fa-regular fa-envelope"></i>
        <p>espacionovem@gmail.com</p>
      </div>
    </div>
  </footer>
);
