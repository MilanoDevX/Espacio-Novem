import React from "react";
import { Link } from "react-router-dom";
import "../../styles/home.css";


export const Navbar = () => {
	return (
		<nav className="navbar navbar-expand-lg bg-body-tertiary navbarcolor" aria-label="Eleventh navbar example mx-5">
			<div className="container-fluid">

				<a className="navbar-brand text-light" href="#">Espacio Novem</a>

				{/* Botón del toggler */}
				<button className="navbar-toggler text-light border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>



				{/* Contenido del navbar */}
				<div className="collapse navbar-collapse justify-content-end" id="navbarContent">
					<ul className="navbar-nav me-3 mb-2 mb-lg-0">
						<li className="nav-item">
							<a className="nav-link active text-light anchor" aria-current="page" href="#"><span className="d-lg-none me-1"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" stroke-width="2">
								<path d="M5 12l-2 0l9 -9l9 9l-2 0"></path>
								<path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"></path>
								<path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"></path>
							</svg></span>Inicio</a>
						</li>
						<li className="nav-item">
							<a className="nav-link text-light anchor"><span className="d-lg-none me-1"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" stroke-width="2">
								<path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path>
								<path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
							</svg></span>Quienes somos</a>
						</li>
						<li className="nav-item">
							<a className="nav-link text-light anchor"><span className="d-lg-none me-1"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" stroke-width="2">
								<path d="M21 12l-9 -9l-9 9h2v7a2 2 0 0 0 2 2h4.7"></path>
								<path d="M9 21v-6a2 2 0 0 1 2 -2h2"></path>
								<path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
								<path d="M20.2 20.2l1.8 1.8"></path>
							</svg></span>Consultorios</a>
						</li>
						<li className="nav-item">
							<a className="nav-link text-light anchor"><span className="d-lg-none me-1"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" stroke-width="2">
								<path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z"></path>
								<path d="M3 7l9 6l9 -6"></path>
							</svg></span>Contacto</a>
						</li>
					</ul>

					<button className="btn text-light border">Iniciar Sesión</button>
				</div>
			</div>
		</nav>

	);
};
