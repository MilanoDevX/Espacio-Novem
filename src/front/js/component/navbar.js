import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate, Link } from "react-router-dom";
import { Modal } from "bootstrap";
import '../../styles/navbar.css';

export const Navbar = () => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);
  const [user, setUser] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    actions.getCurrentUser?.().catch((err) => console.error("Error al obtener el usuario:", err));
  }, [actions]);

  useEffect(() => {
    const loginModalElement = document.getElementById("loginModal");

    if (loginModalElement) {
      const handleHidden = () => {
        document.body.classList.remove("modal-open");
        document.body.style.overflow = "auto";
        document.body.style.paddingRight = "0";
      };

      loginModalElement.addEventListener("hidden.bs.modal", handleHidden);
      return () => {
        loginModalElement.removeEventListener("hidden.bs.modal", handleHidden);
      };
    }
  }, []);

  useEffect(() => {
    const navContent = document.getElementById("navbarContent");
    if (navContent) {
      const handleShown = () => setNavOpen(true);
      const handleHidden = () => setNavOpen(false);
      navContent.addEventListener("shown.bs.collapse", handleShown);
      navContent.addEventListener("hidden.bs.collapse", handleHidden);
      return () => {
        navContent.removeEventListener("shown.bs.collapse", handleShown);
        navContent.removeEventListener("hidden.bs.collapse", handleHidden);
      };
    }
  }, []);

  const handleToggle = () => {
    const navContent = document.getElementById("navbarContent");
    const collapseInstance = window.bootstrap?.Collapse.getInstance(navContent);
    if (collapseInstance) {
      collapseInstance.toggle();
    } else if (navContent) {
      new window.bootstrap.Collapse(navContent, { toggle: true }).toggle();
    }
  };

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

  const closeLoginModal = () => {
    const loginModalElement = document.getElementById("loginModal");
    const modalInstance = Modal.getInstance(loginModalElement) || new Modal(loginModalElement);
    modalInstance.hide();
    document.body.classList.remove("modal-open");
    document.body.style.overflow = "auto";
    document.body.style.paddingRight = "0";
    const backdrop = document.querySelector(".modal-backdrop");
    if (backdrop) backdrop.remove();
  };

  const validateForm = () => {
    let valid = true;
    let validationErrors = { email: "", password: "" };
  
    if (!user.email) {
      validationErrors.email = "El correo electrónico es obligatorio.";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      validationErrors.email = "Por favor ingresa un correo electrónico válido.";
      valid = false;
    }
  
    if (!user.password) {
      validationErrors.password = "La contraseña es obligatoria.";
      valid = false;
    }
  
    setErrors(validationErrors);
    return valid;
  };
  

  const loginUser = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const resp = await actions.login(user);

    if (resp) {
      closeLoginModal();
      if (user.rememberMe) {
        localStorage.setItem("rememberedEmail", user.email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }
      navigate(store.user?.is_admin ? "/admin" : "/");
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Correo o contraseña incorrectos.",
      }));
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary navbarcolor">
      <div className="container-fluid">
        {store.user?.email ? (
          <button type="button" className="btn dos m-2" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample">
            Espacio Novem
          </button>
        ) : (
          <button className="adminbutton">Espacio Novem</button>
        )}

        <button
          className="navbar-toggler text-light border-0 ms-auto"
          type="button"
          onClick={handleToggle}
        >
          {navOpen ? <span className="fa-solid fa-xmark"></span> : <span className="fa-solid fa-bars"></span>}
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarContent">
          <ul className="navbar-nav me-3 mb-2 mb-lg-0 d-flex align-items-center">
            <li className="nav-item">
              <Link className="nav-link active text-light" to="/">
                <span className="d-lg-none me-1"><i className="fa-solid fa-house"></i></span> Inicio
              </Link>
            </li>
            {store.user?.email && (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-light" to="/reservations">
                    <span className="d-lg-none me-1"><i className="fa-solid fa-clock"></i></span> Reservas
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-light" to="/agenda">
                    <span className="d-lg-none me-1"><i className="fa-solid fa-calendar-days"></i></span> Agenda
                  </Link>
                </li>
              </>
            )}
            {store.user?.is_admin && (
              <li className="nav-item">
                <Link className="nav-link text-light" to="/admin">
                  <span className="d-lg-none me-1"><i className="fa-solid fa-user-tie"></i></span> Administrar
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link className="nav-link text-light" to="/aboutUs">
                <span className="d-lg-none me-1"><i className="fa-solid fa-hand-holding-heart"></i></span> Quienes Somos
              </Link>
            </li>
            {store.user?.email && (
              <li className="nav-item">
                <button onClick={handleLogout} className="btn closenav m-2">Cerrar Sesión</button>
              </li>
            )}
            {!store.user?.email && (
              <li className="nav-item">
                <button type="button" className="btn btn-secondary text-light" data-bs-toggle="modal" data-bs-target="#loginModal">
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
                  <label htmlFor="exampleInputEmail1" className="form-label">Correo Electrónico</label>
                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    className="form-control form-control-lg dos"
                    id="exampleInputEmail1"
                    onChange={handleChange}
                  />
                  {errors.email && <div className="text-danger">{errors.email}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
                  <input
                    type="password"
                    name="password"
                    value={user.password}
                    className="form-control form-control-lg dos"
                    id="exampleInputPassword1"
                    onChange={handleChange}
                  />
                  {errors.password && <div className="text-danger">{errors.password}</div>}
                </div>
                <div className="mb-3 d-flex align-items-center">
                  <input
                    type="checkbox"
                    className="form-check-input me-2"
                    id="rememberMe"
                    name="rememberMe"
                    checked={user.rememberMe}
                    onChange={handleChange}
                  />
                  <label className="form-check-label pt-1" htmlFor="rememberMe">Recordar usuario</label>
                </div>
                <div className="mb-3">
                  <Link to="/register" className="custom-link" onClick={closeLoginModal}>
                    <p>¿No tienes cuenta? Regístrate</p>
                  </Link>
                </div>
                <div className="mb-3">
                  <Link to="/send-email" className="custom-link" onClick={closeLoginModal}>
                    <p>¿Olvidaste tu contraseña?</p>
                  </Link>
                </div>
                <div className="d-flex justify-content-center">
                  <button className="btn-consult" type="submit">Ingresar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
