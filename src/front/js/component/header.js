import React from "react";
import { Link } from "react-router-dom";
import "../../styles/header.css";
import consultories from "../../img/flores.jpg";


export const Header = () => {
	return (
		<>
			<div className="header d-flex flex-lg-row flex-column justify-content-center align-items-center">
				<div className="titlenovem title-espacio me-lg-5 mb-4 mb-lg-0">
					<h1 className="text-center">Espacio</h1>
					<h1 className="text-center2">Novem</h1>
					<h3 className="text-end">Alquiler de espacios profesionales</h3>
					<img className="imageconultories me-lg-4 imgheader img-fluid" src={consultories} alt="Patient" />
				</div>
				<div>
				</div>
			</div>
		</>
	)
}
