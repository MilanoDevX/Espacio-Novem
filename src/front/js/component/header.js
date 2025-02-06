import React from "react";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import patient from "../../img/patient.webp";
import consultories from "../../img/consult.jpg";


export const Header = () => {
	return (
	<>
		<div className="header d-flex flex-lg-row flex-column justify-content-center align-items-center">
			<div className="titlenovem title-espacio me-lg-5 mb-4 mb-lg-0">
				<h1>Espacio</h1>
				<h2 className="text-center">Novem</h2>
				<h3 className="text-end">Alquiler de espacios profesionales</h3>
				<img className="imageconultories me-lg-4 imgheader img-fluid" src={consultories} alt="Patient" />
			</div>
			<div>
			</div>
		</div>
	</>
	)
}
