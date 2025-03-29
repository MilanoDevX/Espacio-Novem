import React from "react";
import "../../styles/header.css";
import consultories from "../../img/consultorio.jpg";
import { Benefits } from "./benefits";

export const Header = () => {
	return (
		<>
			<div className="header d-flex flex-column flex-lg-row justify-content-center align-items-center text-center text-lg-start">
				<div className="titlenovem me-lg-5 mb-4 mb-lg-0">
					<h1>Espacio</h1>
					<h1 className="text-secondary">Novem</h1>
					<h3>Alquiler de espacios profesionales</h3>
				</div>
				<div className="image-container">
					<img className="imageconultories img-fluid" src={consultories} alt="Consultorio" />
				</div>
			</div>
			<Benefits />
		</>
	);
}
