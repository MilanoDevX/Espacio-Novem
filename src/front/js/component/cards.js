import React from "react";
import "../../styles/home.css";
import consultorio1 from "../../img/consultorio1.webp";
import consultorio2 from "../../img/consultorio2.webp";
import consultorio3 from "../../img/consultorio3.webp";

export const Cards = () => {
    return (
        <div className=" m-5">
            <h3 className="text-center title-espacio fs-2 ">Nuestros consultorios</h3>
            <div className="d-flex justify-content-center align-item-center">
                <div className="card mx-3">
                    <div>
                        <img className="card-image" src={consultorio1} alt="Consultorio 1" />
                    </div>
                    <div className="category"> Consultorio 1 </div>
                    <div className="heading">
                        A heading that must span over two lines
                    </div>
                    <button className="btn solicitar text-light">Consultar</button>
                </div>

                <div className="card mx-3">
                    <div>
                        <img className="card-image" src={consultorio2} alt="Consultorio 2" />
                    </div>
                    <div className="category"> Consultorio 2 </div>
                    <div className="heading">
                        A heading that must span over two lines
                    </div>
                    <button className="btn solicitar text-light">Consultar</button>
                </div>

                <div className="card mx-3">
                    <div>
                        <img className="card-image" src={consultorio3} alt="Consultorio 3" />
                    </div>
                    <div className="category"> Consultorio 3 </div>
                    <div className="heading">
                        A heading that must span over two lines
                    </div>
                    <button className="btn solicitar text-light">Consultar</button>
                </div>
            </div>

        </div>
    );
};
