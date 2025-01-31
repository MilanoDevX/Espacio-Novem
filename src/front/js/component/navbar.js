import React, { useContext, useState } from "react";
import "../../styles/inicioSesion.css";
import image from '../../img/image.png';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
 
  const navigate = useNavigate(); 
  const { actions } = useContext(Context);

  
  const [user, setUser] = useState({ email: "" });

  const registerUser = () => {
    navigate("/register"); 
  };


  const loginUser = () => {
    navigate("/"); 
  };
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary navbarcolor">
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
        <button
          className="navbar-toggler text-light border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarContent">
          <ul className="navbar-nav me-3 mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active text-light anchor customs-link" to="/">
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
            {/* <li className="nav-item">
              <a className="nav-link text-light anchor"><span className="d-lg-none me-1"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="24" height="24" strokeWidth="2">
                <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path>
                <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
              </svg></span>  <Link className="custom-link" to={"/reservations"}>Agenda</Link></a>
            </li> */}

            <li className="nav-item">
              <Link className="nav-link text-light anchor" to="/contactMap">
                Contacto
              </Link>
            </li>
          </ul>
          {/* Dropdown de inicio de sesión */}
          {!store.user ? (
            <div className="btn-group dropstart">
              <button
                type="button"
                className="btn btn-secondary dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Inicio Sesión
              </button>
              <ul className="dropdown-menu dos">
                <div className="card-login p-3 dos" style={{ width: "25rem" }}>
                  <form className="body-inicio" onSubmit={loginUser}>
                    <div className="mb-4">
                      <label htmlFor="email" className="form-label">
                        Correo Electrónico
                      </label>
                      <input
                        type="email"
                        value={user.email}
                        className="form-control"
                        id="email"
                        onChange={(event) =>
                          setUser({ ...user, email: event.target.value })
                        }
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="password" className="form-label">
                        Contraseña
                      </label>
                      <input
                        type="password"
                        value={user.password}
                        className="form-control"
                        id="password"
                        onChange={(event) =>
                          setUser({ ...user, password: event.target.value })
                        }
                      />
                    </div>
                    <div className="text-center mt-2">
                      <Link to="/aboutUs" className="custom-link trans">
                        ¿Olvidaste tu contraseña?
                      </Link>
                    </div>
                    <div className="d-flex justify-content-end">
                      <button className="button-pastel" type="submit">
                        Ingresar
                      </button>
                    </div>
                  </form>
                </div>
              </ul>
            </div>
          ) : (
            <button className="btn btn-danger" onClick={actions.logout}>
              Cerrar Sesión
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
