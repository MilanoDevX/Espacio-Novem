import React, { useState } from "react";
import "../../styles/home.css";
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
            description: "Descripción del consultorio 1.",
            price: "200",
        },
        {
            id: 2,
            img: consultorio2,
            name: "Consultorio 2",
            description: "Descripción del consultorio 2.",
            price: "300",
        },
        {
            id: 3,
            img: consultorio3,
            name: "Consultorio 3",
            description: "Descripción del consultorio 3.",
            price: "400",
        },
    ];

    const toggleModal = (office) => {
        setSelectedOffice(office);
        setShowModal(!showModal);
    };

    return (
        <div className="container my-5">
            <h3 className="text-center title-espacio fs-2">Nuestros consultorios</h3>
            <div className="row justify-content-center">
                {offices.map((office) => (
                    <div className="col-12 col-sm-6 col-md-4 d-flex justify-content-center mb-4" key={office.id}>
                        <div className="card" style={{ width: "100%", maxWidth: "300px" }}>
                            <img
                                className="card-img-top"
                                src={office.img}
                                alt={office.name}
                                style={{ objectFit: "cover", height: "200px" }}
                            />
                            <div className="card-body text-center">
                                <h5 className="card-title">{office.name}</h5>
                                <p className="card-text">Precio: ${office.price}</p>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => toggleModal(office)}
                                >
                                    Consultar
                                </button>
                            </div>
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
                                <h5 className="modal-title" style={{ color: "#F2E5D5", }}>
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
