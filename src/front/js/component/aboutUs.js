import React, { useContext, useState } from "react";
import "/src/front/styles/aboutUs.css";
import image from "../../img/despacho-psicologia.webp";


export const AboutUs = () => {
    return (
        <>
            <div className="aboutUs-container d-flex justify-space-between pt-5">
                <div>
                    <h4 className="mx-4">Nuestro Equipo</h4>
                    <p className="mx-4">
                        Somos un equipo compuesto por dos Licenciadas en Psicología, con más de cinco años de experiencia trabajando en conjunto para ofrecer atención psicológica de calidad y un espacio colaborativo para colegas profesionales. Nuestra vocación es acompañar a cada paciente en su proceso de crecimiento personal, brindando un abordaje cálido, respetuoso y adaptado a sus necesidades individuales.
                    </p>
                    <h4 className="mx-4">Nuestra práctica clínica</h4>
                    <p className="mx-4">
                        Atención personalizada: cada una de nosotras atiende a sus propios pacientes, garantizando un seguimiento continuo y un vínculo terapéutico sólido.
                    </p>

                    <p className="mx-4">
                        Enfoque integral: utilizamos técnicas basadas en evidencia científica y recursos creativos para abordar una amplia gama de problemáticas, desde ansiedad y estrés hasta dificultades relacionales y desarrollo emocional infantil.
                    </p>
                    <h4 className="mx-4">Consultorios en alquiler</h4>
                    <p className="mx-4">
                        Además de nuestra labor clínica, ponemos a disposición consultorios en alquiler dirigidos a psicólogos y otros profesionales de la salud mental. Nuestros espacios se caracterizan por:
                    </p>
                    <ul>
                        <li>
                            <span><strong>Ambiente agradable y empático</strong></span>
                            <p>
                                Cada sala ha sido diseñada para generar sensaciones de calidez y confianza, favoreciendo que el paciente se sienta cómodo y en plena disposición para el proceso terapéutico.
                            </p>
                        </li>


                    </ul>
                </div>
                <img className="picture w-50 h-50 mx-4" src={image}></img>
            </div>
            <div className="aboutUs-container">
                <ul>
                    <li>
                        <span><strong>Comodidades en beneficio del paciente</strong></span>
                        <p>
                            Contamos con mobiliario ergonómico y climatización regulable; todo pensado para que el profesional y su paciente disfruten de una experiencia sin distracciones.
                        </p>
                    </li>
                    <li>
                        <span><strong>Materiales y recursos especializados</strong></span>
                        <p>
                            Disponemos de un rincón de juegos y material didáctico para terapia infantil, así como elementos proyectivos y pictogramas, facilitando intervenciones lúdicas y creativas cuando el caso lo requiera.
                        </p>
                    </li>
                </ul>
                <h4 className="mx-4">Nuestro Compromiso</h4>
                <p className="mx-4">
                    Creemos que el bienestar emocional se construye en un entorno de confianza y respeto. Por eso, mantenemos un calendario de limpieza y desinfección de los consultorios, un sistema de reservas sencillo y tarifas flexibles, promoviendo así un espacio de trabajo profesional y acogedor para todos los colegas y sus pacientes.
                </p>
                <p className="mx-4">
                    Esperamos que este espacio les sea útil tanto para su consulta clínica como para el desarrollo de su práctica profesional.
                </p>
                 <p className="mx-4">
                    ¡Les invitamos a conocernos y formar parte de nuestra comunidad de salud mental!
                </p>


            </div>

            {/* <div className="d-flex justify-content-center pt-5">
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
            </div> */}
        </>
    );
};
