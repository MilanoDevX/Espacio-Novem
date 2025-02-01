import React from "react";
import "../../styles/contactMap.css";
import { useNavigate } from 'react-router-dom';

export const ContactMap = () => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/');
        window.scrollTo(0,0);
    };

    return (
        <div className="contact-container">
            <div className="contact-info">
                <h2>Espacio Novem</h2>
            </div>

            <div className="contact-detail">
                <i className="fa-brands fa-whatsapp"></i>
                <a href="https://wa.me/59891744816?text=Hola,%20quiero%20más%20información" target="_blank" rel="noopener noreferrer">
                    +598 91 744 816
                </a>
            </div>

            <div className="contact-detail">
                <i className="fa-regular fa-envelope"></i>
                <a href="mailto:espacionovem@gmail.com">espacionovem@gmail.com</a>
            </div>

            <div className="contact-detail">
                <i className="fa-brands fa-instagram"></i>
                <a href="https://www.instagram.com/espacio_novem" target="_blank" rel="noopener noreferrer">Espacio_Novem</a>
            </div>

            <div className="politica-reserva">
                <h3>Política de Reserva</h3>
                <p>
                    Bienvenidos a nuestro espacio. Te recordamos que si necesitas camilla o mesa para niños debes agendarlo coincidiendo con el horario destinado a tales fines (4 y 5).
                </p>
                <h3>Política de cancelación:</h3> <p>Puedes cancelar o reprogramar hasta 24 horas antes de la cita.</p>
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
