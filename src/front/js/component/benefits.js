import React from "react";
import "../../styles/home.css";
import porteria from "../../img/porteria.webp";
import kitchenette from "../../img/kitchenette.webp";

export const Benefits = () => {
    return (
        <div className="benefits text-light py-4">
            <div className="container">
                <div className="d-flex flex-wrap justify-content-between align-items-center">
                    <div className="benefit-item d-flex align-items-center">
                        <h3 className="benefit me-2">5</h3>
                        <div>
                            <h4 className="benefit-name my-0">Consultorios</h4>
                            <p className="benefit-description my-0">Lorem Ipsum</p>
                        </div>
                    </div>
                    <div className="benefit-item d-flex align-items-center">
                        <img className="icon-img mx-2" src={porteria} alt="Portería" />
                        <div>
                            <h4 className="benefit-name my-0">Portería</h4>
                            <p className="benefit-description my-0">Lorem Ipsum</p>
                        </div>
                    </div>
                    <div className="benefit-item d-flex align-items-center">
                        <i className="fa-solid fa-wifi fa-lg me-2" style={{ color: "#ffffff" }}></i>
                        <div>
                            <h4 className="benefit-name my-0">Acceso a Wifi</h4>
                            <p className="benefit-description my-0">Lorem Ipsum</p>
                        </div>
                    </div>
                    <div className="benefit-item d-flex align-items-center">
                        <img className="icon-img mx-2" src={kitchenette} alt="Cocina" />
                        <div>
                            <h4 className="benefit-name my-0">Acceso a Cocina</h4>
                            <p className="benefit-description my-0">Lorem Ipsum</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
