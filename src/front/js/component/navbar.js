import React, { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

import Login from "./login";

export const Navbar = () => {
  const navigate = useNavigate();
  const { actions } = useContext(Context);
  const [user, setUser] = useState({ email: "" });

  const registerUser = () => {
    navigate("/register");
  };



  if (user.email === "espacionovem@anda.com") {
    navigate("/admin");
  }



  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary navbarcolor" aria-label="Eleventh navbar example mx-5">
      <div className="container-fluid">
        <button
          type="button"
          className="btn dos"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasExample"
          aria-controls="offcanvasExample"
        >
          Espacio Novem
        </button>
        {/* Botón del toggler */}
        <button className="navbar-toggler text-light border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        {/* Navbar Links */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarContent">
          <ul className="navbar-nav me-3 mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active text-light anchor customs-link" aria-current="page" to="/">
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light anchor" to="/aboutUs">
                Quienes Somos
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light anchor" to="/reservations">
                Reservas
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light anchor" to="/agenda">
                Agenda
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light anchor" to="/contactMap">
                Contacto
              </Link>
            </li>
          </ul>
          <Login />
        </div>
      </div>
    </nav>
  );
};
