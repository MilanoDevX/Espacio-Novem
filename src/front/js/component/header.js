import React from "react";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import patient from "../../img/patient.webp";
import { Benefits } from "./benefits";


export const Header = () => {
	return (
	<>
		<div className="header d-flex flex-lg-row flex-column justify-content-center align-items-center">
			<div className="title-espacio me-lg-5 mb-4 mb-lg-0">
				<h1>Espacio</h1>
				<h2 className="text-center">Novem</h2>
				<h3 className="text-end">Alquiler de espacios profesionales</h3>
			</div>
			<div>
				<img className="me-lg-4 imgheader img-fluid" src={patient} alt="Patient" />
			</div>
		</div>

		<Benefits/>

	</>
	)
}
