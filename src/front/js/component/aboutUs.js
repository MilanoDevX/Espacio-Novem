import React, { useContext, useState } from "react";
import "/src/front/styles/aboutUs.css";
import { Navbar } from "./navbar";

export const AboutUs = () => {
    return (
        <>
            <Navbar />
            <div className="d-flex justify-content-center pt-5">
                <div className="d-flex ">
                    <img src="https://media.istockphoto.com/id/1409400588/es/vector/mujeres-bebiendo-caf%C3%A9-en-casa.jpg?s=612x612&w=0&k=20&c=s-ypCEgvYdknjno4s7JDjijKt8txX4KFHosK-uH2iSE=" className="card-img" alt="Dos mujeres" />
                    <div className="card-img-overlay">
                        <h5 className="card-title about text-center">Quienes somos </h5>
                        <p className="card-text about text-center">Somos un equipo de psicologas brindamos nuestro servicio y alquilamos nuestras oficinas .</p>
                    </div>
                </div>
            </div>

            <div className="d-flex">
                <div className="d-flex align-items-center">
                <img className="registeruser juntas rounded-circle m-2" src="https://st3.depositphotos.com/5934840/14162/v/450/depositphotos_141624536-stock-illustration-woman-cartoon-icon.jpg" alt="Psicologa atendiedno a paciente en el consultorio" />
                    <div className="d-flex">
                    <h5 className="card-title about ">Julia</h5>
                        <p className="card-text about ">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    
                    </div>
                    <div className="d-flex align-items-center">
                <img className="registeruser juntas rounded-circle m-2" src="https://st3.depositphotos.com/5934840/14162/v/450/depositphotos_141624536-stock-illustration-woman-cartoon-icon.jpg" alt="Psicologa atendiedno a paciente en el consultorio" />
                    <div className="d-flex">
                    <h5 className="card-title about ">Sofia</h5>
                        <p className="card-text about ">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    
                    </div>
                </div>
            </div>
            </div>
        </>
    )

}