import React, { useContext, useState } from "react";
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

  const loginUser = async () => {
    const resp = await actions.login(user);
    if (resp.status && !resp.rol) {
      navigate("/");
    }

    if (resp) {
      console.log(store.user);
      if (store.user.is_admin) {
        navigate("/admin");
      }

      if (user.email === "espacionovem@anda.com") {
        navigate("/admin");
      }
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary navbarcolor" aria-label="Eleventh navbar example mx-5">
      <div className="container-fluid">
        <button
          type="button"
          className="btn dos d-lg-none"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasExample"
          aria-controls="offcanvasExample"
        >
          Espacio Novem
        </button>
        {/* Mobile Toggler */}
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

          {/* Dropdown for login */}
          <div className="btn-group dropstart">
            <button type="button" className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              Inicio Sesión
            </button>
            <ul className="dropdown-menu dos">
              <div className="card-login p-3 dos" style={{ width: '100%' }}>
                <form className="body-inicio uno">
                  <div className="mb-4">
                    <label htmlFor="exampleInputEmail1" className="form-label">Correo Electrónico</label>
                    <input
                      type="email"
                      value={user.email || ""}
                      className="form-control form-control-lg dos"
                      id="exampleInputEmail1"
                      onChange={event => setUser({ ...user, email: event.target.value })}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
                    <input
                      type="password"
                      value={user.password || ""}
                      className="form-control form-control-lg dos"
                      id="exampleInputPassword1"
                      onChange={event => setUser({ ...user, password: event.target.value })}
                    />
                  </div>
                  <div className="mb-4 form-check">
                    <Link to={"/send-email"} className="custom-link trans">
                      <p>¿Olvidaste tu contraseña?</p>
                    </Link>
                  </div>
                  <div className="d-flex justify-content-end">
                    <button className="button-pastel btndos" onClick={registerUser}>Registro</button>
                    <button className="button-pastel btndos" onClick={loginUser}>Ingresar</button>
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
