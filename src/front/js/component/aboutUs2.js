import React, { useContext, useState } from "react";
import "/src/front/styles/aboutUs2.css";
import colegascharlando from "../../img/colegascharlando.webp";
import user from "../../img/user.webp";


export const AboutUs2 = () => {
    return (
        <>
            <div className="d-flex justify-content-center pt-5">
                <div className="d-flex ">
                    <div className="card-img-overlay my-5">
                        <h2 className="card-title about-us text-center mt-4">Quiénes somos </h2>
                        <p className="card-text about text-center ">Somos un equipo de Psicólogas brindamos nuestro servicio y alquilamos nuestras oficinas.</p>
                    </div>
                    <img src={colegascharlando} className="card-img m-5" alt="Dos mujeres" />
                </div>
            </div>

            <div className="d-flex">
                <div className="d-flex align-items-center">
                    <img className="registeruser juntas rounded-circle m-2" src={user} alt="Psicologa atendiedno a paciente en el consultorio" />
                    <div className="d-flex">
                        <h5 className="card-title about ">Lucía: </h5>
                        <p className="card-text about "> Soy Psicóloga desde hace 15 años y estoy convencida que elegí la mejor carrera .</p>
                    </div>
                </div>

                <div className="d-flex align-items-center">
                    <img className="registeruser juntas rounded-circle m-2" src={user} alt="Psicologa atendiedno a paciente en el consultorio" />
                    <div className="d-flex">
                        <h5 className="card-title about ">Lucía: </h5>
                        <p className="card-text about "> Soy Psicóloga desde hace 10 años comprometida con mi trabajo .</p>
                    </div>
                </div>
            </div>
        </>
    );
};
