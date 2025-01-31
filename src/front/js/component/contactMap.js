import React from "react";
import "../../styles/contactMap.css";
import { useNavigate } from 'react-router-dom';

export const ContactMap = () => {
    const navigate = useNavigate();

    const handleNavigate = () => {
    navigate('/');  // Cambia la ruta
    window.scrollTo(0, 0);  // Reinicia el scroll
};

    return (
        <div className="contact-container">
            <div className="contact-info">
                <p>CONTACTO ESPACIO NOVEM</p>
            </div>

            <div className="contact-detail">
                <i className="fa-brands fa-whatsapp"></i>+598 91 744 816
            </div>

            <div className="contact-detail">
                <i className="fa-regular fa-envelope"></i>
                <a href="mailto:espacionovem@gmail.com">espacionovem@gmail.com</a>
            </div>

            <div className="contact-detail">
                <i className="fa-brands fa-instagram"></i>
                <a href="https://www.instagram.com/espacio_novem" target="_blank" rel="noopener noreferrer">Espacio_Novem</a>
            </div>

            <div className="contact-map-container">
                <iframe
                    title="Google Map"
                    src="https://maps.google.com/maps?q=18%20de%20julio%20y%20Barrios%20Amorin,%20Montevideo%20Uruguay&t=&z=14&ie=UTF8&iwloc=&output=embed"
                    className="contact-map-iframe"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
            <button className="btn" onClick={handleNavigate}>Volver</button>
        </div>
    );
};
