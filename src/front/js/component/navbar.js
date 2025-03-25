import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate, Link } from "react-router-dom";
import Login from "./login";
import '../../styles/navbar.css';

export const Navbar = () => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getCurrentUser();
  }, []);

  const handleLogout = () => {
    actions.logout();
    navigate("/");
  };

  const handleAdmin = () => {
    navigate("/admin");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary navbarcolor" aria-label="Eleventh navbar example mx-5">
      <div className="container-fluid">
     
        {store.user && store.user.email && (
          <button
            type="button"
            className="btn dos m-2"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasExample"
            aria-controls="offcanvasExample"
          >
            Espacio Novem
          </button>
        )}

        {!store.user?.email && (
          <button onClick={handleAdmin} className="adminbutton">
            Espacio Novem
          </button>
        )}

        <button
          className="navbar-toggler text-light border-0 ms-auto"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="fa-solid fa-bars"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarContent">
          <ul className="navbar-nav me-3 mb-2 mb-lg-0 d-flex align-items-center">
            <li className="nav-item">
              <Link className="nav-link active text-light" to="/">
                <span className="d-lg-none me-1">
                  <i className="fa-solid fa-house"></i>
                </span>
                Inicio
              </Link>
            </li>

            {store.user?.email && (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-light" to="/reservations">
                    <span className="d-lg-none me-1">
                      <i className="fa-solid fa-clock"></i>
                    </span>
                    Reservas
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-light" to="/agenda">
                    <span className="d-lg-none me-1">
                      <i className="fa-solid fa-calendar-days"></i>
                    </span>
                    Agenda
                  </Link>
                </li>
              </>
            )}

            {store.user?.is_admin && (
              <li className="nav-item">
                <Link className="nav-link text-light" to="/admin">
                  <span className="d-lg-none me-1">
                    <i className="fa-solid fa-user-tie"></i>
                  </span>
                  Administrar
                </Link>
              </li>
            )}

            <li className="nav-item">
              <Link className="nav-link text-light" to="/aboutUs">
                <span className="d-lg-none me-1">
                  <i className="fa-solid fa-hand-holding-heart"></i>
                </span>
                Quienes Somos
              </Link>
            </li>

            {store.user?.email && (
              <li className="nav-item">
                <button onClick={handleLogout} className="btn closenav m-2">
                  Cerrar Sesión
                </button>
              </li>
            )}
          </ul>

          {!store.user?.email ? <Login /> : null}
        </div>
      </div>
    </nav>
  );
};

