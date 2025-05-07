import React from "react";
import "../../styles/hero.css";
import consultories from "../../img/hero2.webp";
import { Benefits } from "./benefits";

export const Hero = () => {
	return (
		<>
			{/* <div className="header d-flex flex-column flex-lg-row justify-content-center align-items-center text-center text-lg-start">
				<div className="titlenovem w-100">
					<h3>Alquiler de espacios profesionales</h3>
				</div>
				<div className="image-container">
					<img className="imageconsultories img-fluid" src={consultories} alt="Consultorio" />
				</div>
			</div> */}

			<div className="header">
				<div className="image-container">
					<div className="titlenovem">
						<h1 className="title">Espacio Novem</h1>
						<h3>Alquiler de espacios profesionales</h3>
					</div>
					<img className="imageconsultories img-fluid" src={consultories} alt="Consultorio" />
				</div>
			</div>

			<Benefits />
		</>
	);
}
