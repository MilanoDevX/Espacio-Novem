import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import Login from "./login";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getCurrentUser();
  }, [store.user]);

  console.log(store.user)

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary navbarcolor">
      <div className="container-fluid">

        {store.user && store.user.email && (
          <button
            type="button"
            className="btn dos"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasExample"
            aria-controls="offcanvasExample"
          >
            Espacio Novem
          </button>
        )}

        <div className="collapse navbar-collapse justify-content-end">
          <ul className="navbar-nav me-3 mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active text-light" to="/">Inicio</Link>
            </li>
            {store.user && store.user.email && (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-light" to="/reservations">Reservas</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-light" to="/agenda">Agenda</Link>
                </li>
              </>
            )}
            {store.user && store.user.is_admin? (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-light" to="/admin">Administrar</Link>
                </li>
              </>
            ) : null
            }
            <li className="nav-item">
              <Link className="nav-link text-light" to="/aboutUs">Quienes Somos</Link>
            </li>
          </ul>
          <Login />
        </div>
      </div>
    </nav>
  );
};