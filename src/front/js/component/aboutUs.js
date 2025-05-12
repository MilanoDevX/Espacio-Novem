import React, { useContext, useState } from "react";
import "/src/front/styles/aboutUs.css";
import image from "../../img/despacho-psicologia.webp";


export const AboutUs = () => {
    return (
        <>
            <div className="aboutUs-container d-flex justify-space-between pt-5">
                <div>
                    <h4 className="aboutUs-subtitle mx-4">Nuestro Equipo</h4>
                    <p className="mx-4">
                        Somos un equipo compuesto por dos Licenciadas en Psicología, con más de cinco años de experiencia trabajando en conjunto para ofrecer atención psicológica de calidad y un espacio colaborativo para colegas profesionales. Nuestra vocación es acompañar a cada paciente en su proceso de crecimiento personal, brindando un abordaje cálido, respetuoso y adaptado a sus necesidades individuales.
                    </p>

                    <h4 className="aboutUs-subtitle mx-4">Consultorios en alquiler</h4>
                    <p className="mx-4">
                        Además de nuestra labor clínica, ponemos a disposición consultorios en alquiler dirigidos a psicólogos y otros profesionales de la salud mental. Nuestros espacios se caracterizan por:
                    </p>

                    <ul>
                        <li>
                            <span><strong>Ambiente agradable y acogedor</strong></span>
                            <p>
                                Cada sala ha sido diseñada para generar sensaciones de calidez y confianza, favoreciendo que el paciente se sienta cómodo y en plena disposición para el proceso terapéutico.
                            </p>
                        </li>
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
                </div>
                <img className="picture w-50 h-50 mx-4" src={image}></img>
            </div>
            <div className="aboutUs-container">
                <h4 className="aboutUs-subtitle mx-4">Nuestro Compromiso</h4>
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
        </>
    );
};
