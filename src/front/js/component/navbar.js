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

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary navbarcolor" aria-label="Eleventh navbar example mx-5">
  <div className="container-fluid">
    {/* Espacio Novem visible solo si el usuario está logueado */}
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

    {/* Botón de toggler (hamburguesa) para dispositivos pequeños */}
    <button
      className="navbar-toggler text-light border-0 ms-auto"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarContent"
      aria-controls="navbarContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>

    {/* Contenido del navbar (menú de navegación) */}
    <div className="collapse navbar-collapse justify-content-end" id="navbarContent">
      <ul className="navbar-nav me-3 mb-2 mb-lg-0 d-flex align-items-center">
        <li className="nav-item">
          <Link className="nav-link active text-light" to="/">
            <span className="d-lg-none me-1">
              {/* Icono de inicio */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="24" height="24" strokeWidth="2">
                <path d="M5 12l-2 0l9 -9l9 9l-2 0"></path>
                <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"></path>
                <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"></path>
              </svg>
            </span>
            Inicio
          </Link>
        </li>

        {/* Condición para mostrar los elementos solo si el usuario está logueado */}
        {store.user?.email && (
          <>
            <li className="nav-item">
              <Link className="nav-link text-light" to="/reservations">
                <span className="d-lg-none me-1">
                  {/* Icono de reservas */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="24" height="24" strokeWidth="2">
                    <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path>
                    <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
                  </svg>
                </span>
                Reservas
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" to="/agenda">
                <span className="d-lg-none me-1">
                  {/* Icono de agenda */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="24" height="24" strokeWidth="2">
                    <path d="M21 12l-9 -9l-9 9h2v7a2 2 0 0 0 2 2h4.7"></path>
                    <path d="M9 21v-6a2 2 0 0 1 2 -2h2"></path>
                    <path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                    <path d="M20.2 20.2l1.8 1.8"></path>
                  </svg>
                </span>
                Agenda
              </Link>
            </li>
          </>
        )}

        {/* Si el usuario es administrador, mostrar la opción de Administrar */}
        {store.user?.is_admin && (
          <li className="nav-item">
            <Link className="nav-link text-light" to="/admin">
              <span className="d-lg-none me-1">
                {/* Icono de administración */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="24" height="24" strokeWidth="2">
                  <path d="M12 4v2"></path>
                  <path d="M12 10v8"></path>
                  <path d="M10 12h4"></path>
                </svg>
              </span>
              Administrar
            </Link>
          </li>
        )}

        {/* Enlace a "Quienes Somos" */}
        <li className="nav-item">
          <Link className="nav-link text-light" to="/aboutUs">
            <span className="d-lg-none me-1">
              {/* Icono de quienes somos */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="24" height="24" strokeWidth="2">
                <path d="M21 12l-9 -9l-9 9h2v7a2 2 0 0 0 2 2h4.7"></path>
                <path d="M9 21v-6a2 2 0 0 1 2 -2h2"></path>
              </svg>
            </span>
            Quienes Somos
          </Link>
        </li>

        {/* Botón de Cerrar Sesión visible solo si el usuario está logueado */}
        {store.user?.email && (
          <li className="nav-item">
            <button onClick={handleLogout} className="btn closenav m-2">
              Cerrar Sesión
            </button>
          </li>
        )}
      </ul>

      {/* Mostrar Login si no hay un usuario logueado */}
      {!store.user?.email ? <Login /> : null}
    </div>
  </div>
</nav>

  );
};
