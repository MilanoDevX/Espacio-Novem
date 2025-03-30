import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate, Link } from "react-router-dom";
import '../../styles/navbar.css'; 

export const Navbar = () => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);

  const [user, setUser] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  useEffect(() => {
    actions.getCurrentUser();
  }, [actions]);

  const handleLogout = () => {
    actions.logout();
    navigate("/");
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const loginUser = async (e) => {
    e.preventDefault();
    const resp = await actions.login(user);

    if (resp) {
      if (user.rememberMe) {
        localStorage.setItem("rememberedEmail", user.email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }
      navigate(store.user.is_admin ? "/admin" : "/");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary navbarcolor" aria-label="Eleventh navbar example mx-5">
      <div className="container-fluid">
        {store.user && store.user.email ? (
          <button
            type="button"
            className="btn dos m-2"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasExample"
            aria-controls="offcanvasExample"
          >
            Espacio Novem
          </button>
        ) : (
          <button className="adminbutton">
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

            {!store.user?.email && (
              <li className="nav-item">
                <button
                  type="button"
                  className="btn btn-secondary text-light"
                  data-bs-toggle="modal"
                  data-bs-target="#loginModal"
                >
                  Iniciar Sesión
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="modal fade" id="loginModal" tabIndex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="loginModalLabel">Iniciar Sesión</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={loginUser}>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    className="form-control form-control-lg dos"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={user.password}
                    className="form-control form-control-lg dos"
                    id="exampleInputPassword1"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="rememberMe"
                    name="rememberMe"
                    checked={user.rememberMe}
                    onChange={handleChange}
                  />
                  <label className="form-check-label ms-2 " htmlFor="rememberMe">
                    Recordar usuario
                  </label>
                </div>
                <div className="mb-3">
                  <Link to="/register" className="custom-link">
                    <p>¿No tienes cuenta? Regístrate</p>
                  </Link>
                </div>
                <div className="mb-3">
                  <Link to="/send-email" className="custom-link">
                    <p>¿Olvidaste tu contraseña?</p>
                  </Link>
                </div>
                <div className="d-flex justify-content-end">
                  <button className="btn btn-primary" type="submit">
                    Ingresar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

