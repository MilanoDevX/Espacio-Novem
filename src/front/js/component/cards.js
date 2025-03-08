import React, { useState } from "react";
import "../../styles/card.css";
import consultorio1 from "../../img/consultorio1.webp";
import consultorio2 from "../../img/consultorio2.webp";
import consultorio3 from "../../img/consultorio3.webp";

export const Cards = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedOffice, setSelectedOffice] = useState(null);

    const offices = [
        {
            id: 1,
            img: consultorio1,
            name: "Consultorio 1",
            description: "Este consultorio está diseñado para atender a niños, adolescentes y adultos. Ofreciendo un espacio cálido, acogedor y versátil. La decoración genera una sensación de tranquilidad y confianza.\n\nEquipado con juegos didácticos, cartas emocionales, herramientas para la intervención, materiales de arte y alfombra cómoda para trabajar desde lo lúdico.\n\nEl consultorio está disponible para profesionales que necesiten un espacio flexible por hora o por franjas de tiempo.\nSe fomenta un ambiente de compañerismo y apoyo entre colegas, con la posibilidad de intercambiar experiencias y materiales.\nEsperamos que tanto pacientes como profesionales se sientan cómodos y contenidos.",
            price: "200",
        },
        {
            id: 2,
            img: consultorio2,
            name: "Consultorio 2",
            description: "Espacio cálido, moderno y funcional. Diseñado para brindar comodidad y privacidad en sesiones terapéuticas. La decoración combina colores neutros, con luz natural, creando un ambiente acogedor y profesional.\n\nAlquiler flexible por horas o franjas horarias. Espacio ideal para sesiones individuales, de pareja o familiares.\nAmbiente profesional con buena onda y compañerismo entre colegas.\nUn lugar pensado para brindar bienestar tanto a terapeutas como a pacientes.",
            price: "300",
        },
        {
            id: 3,
            img: consultorio3,
            name: "Consultorio 3",
            description: "Espacio acogedor, minimalista y profesional. Ideal para sesiones terapéuticas con adolescentes y adultos.\nAmbientación diseñada para generar confianza y comodidad. Iluminación cálida y detalles que favorecen la relajación.\nDos sillones cómodos, ubicados estratégicamente para una conversación fluida y cercana.\nAlquiler para psicólogos, disponibilidad horaria amplia.\nUn lugar pensado para el bienestar del terapeuta y el paciente. Con todo lo necesario para un trabajo cómodo y efectivo.",
            price: "400",
        },

        {
            id: 4,
            img: consultorio3,
            name: "Consultorio 4",
            description: "Espacio cálido y funcional, diseñado para generar un ambiente de confianza y comodidad en sesiones terapéuticas. Atmósfera tranquila y segura. Ideal para sesiones individuales, de pareja o familia. Amplia disponibilidad horaria. Espacio versátil.Un lugar pensado para el bienestar del terapeuta y el paciente, con todo lo necesario para un trabajo cómodo y efectivo.",
            price: "400",
        }

    ];

    const toggleModal = (office) => {
        setSelectedOffice(office);
        setShowModal(!showModal);
    };

    return (
        <div className="container my-5">
  <h3 className="text-center title-espacio fs-2">Nuestros consultorios</h3>
  <div className="card-container">
    {offices.map((office) => (
      <div className="card" key={office.id}>
        <img className="card-image" src={office.img} alt={office.name} />
        <div className="card-body text-center">
          <h5 className="card-title">{office.name}</h5>
          <p className="card-text">Precio: ${office.price}</p>
          <button
            className="btn-consult"
            onClick={() => toggleModal(office)}
            aria-label={`Consultar ${office.name}`}
          >
            Consultar
          </button>
        </div>
      </div>
    ))}
  </div>

            {/* Modal */}
            {showModal && selectedOffice && (
                <div
                    className="modal fade show"
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                    style={{ display: "block" }}
                >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div
                                className="modal-header"
                                style={{
                                    fontFamily: "Mulish, sans-serif",
                                    backgroundColor: "#6A7562",
                                }}
                            >
                                <h5 className="modal-title" style={{ color: "#F2E5D5" }}>
                                    {selectedOffice.name}
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    aria-label="Close"
                                    onClick={() => toggleModal(null)}
                                ></button>
                            </div>
                            <div className="modal-body d-flex flex-column flex-md-row align-items-center" style={{ backgroundColor: "#F2E5D5" }}>
                                <img
                                    src={selectedOffice.img}
                                    alt={selectedOffice.name}
                                    className="img-fluid mb-3 mb-md-0"
                                    style={{
                                        objectFit: "cover",
                                        width: "100%",
                                        maxWidth: "300px",
                                        height: "auto",
                                    }}
                                />
                                <div className="ms-md-3">
                                    <h5>{selectedOffice.name}</h5>
                                    <p>Precio: ${selectedOffice.price}</p>
                                    <p>{selectedOffice.description}</p>
                                </div>
                            </div>
                            <div className="modal-footer" style={{ backgroundColor: "#F2E5D5" }}>
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => toggleModal(null)}
                                >
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal backdrop */}
            {showModal && <div className="modal-backdrop fade show"></div>}
        </div>
    );
};
