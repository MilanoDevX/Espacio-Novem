import React, { useContext, useState } from "react";
import "../../styles/inicioSesion.css";
import image from '../../img/image.png';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
 
const navigate = useNavigate();
const { store, actions } = useContext(Context);

    const handleNavigate = () => {
        navigate('/contactMap');
      };
      
  const [user, setUser] = useState({ email: "" })

  const loginUser = async () => {
    const resp = await actions.login(user)
    if (resp.status && !resp.rol) {
      navigate("/menu")
    }

    if (resp) {
      console.log(store.user)
      if(store.user.is_admin){
        navigate("/admin")
      }
      
      if(user.email == "espacionovem@gmail.com"){
        navigate("/admin")
      }
    }
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
        {/* Contenido del navbar */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarContent">
          <ul className="navbar-nav me-3 mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active text-light anchor customs-link" aria-current="page" to="/">
                <span className="d-lg-none me-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="24" height="24" strokeWidth="2">
                    <path d="M5 12l-2 0l9 -9l9 9l-2 0"></path>
                    <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"></path>
                    <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"></path>
                  </svg>
                </span>
                Inicio
              </Link>
            </li>


            <li className="nav-item">
              <Link className="nav-link text-light anchor" to="/aboutUs">
                <span className="d-lg-none me-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="24" height="24" strokeWidth="2">
                    <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path>
                    <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
                  </svg>
                </span>
                Quienes Somos
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light anchor" to="/reservations">
                <span className="d-lg-none me-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="24" height="24" strokeWidth="2">
                    <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path>
                    <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
                  </svg>
                </span>
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
                <span className="d-lg-none me-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="24" height="24" strokeWidth="2">
                    <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z"></path>
                    <path d="M3 7l9 6l9 -6"></path>
                  </svg>
                </span>
                Contacto
              </Link>
            </li>
          </ul>


          {/* Dropdown for login */}
          <div className="btn-group dropstart ">
            <button type="button" className="btn btn-secondary dropdown-toggle " data-bs-toggle="dropdown" aria-expanded="false">
              Inicio Sesión
            </button>
            <ul className="dropdown-menu dos">
              <div className="card-login p-3 dos" style={{ width: '25rem' }}>
                <form className="body-inicio">
                  <div className="mb-4">
                    <label htmlFor="exampleInputEmail1" className="form-label">Correo Electrónico</label>
                    <input
                      type="email"
                      value={user.email || ""}
                      className="form-control form-control-lg"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      onChange={event => setUser({
                        ...user,
                        email: event.target.value
                      })}
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
                    <input
                      type="password"
                      value={user.password || ""}
                      className="form-control form-control-lg"
                      id="exampleInputPassword1"
                      onChange={event => setUser({
                        ...user,
                        password: event.target.value
                      })}
                    />
                  </div>

                  <div className="mb-4 form-check">
                    <Link to={"/register"} className="custom-link trans">
                      <p className="">¿Olvidaste tu contraseña?</p>
                    </Link>
                  </div>
                  {/* tiene que ir a pagina principal */}
                  <div className="d-flex justify-content-end">
                    <button className="button-pastel" onClick={() =>
                      loginUser()
                    } >Ingresar</button>
                  </div>

                </form>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
