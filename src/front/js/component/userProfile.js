import React, { useContext, useEffect } from "react";
import "../../styles/userProfile.css";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const UserProfile = () => {
  const { actions, store } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (!store.user) {
      actions.getProfile(); 
    }
  }, []);

  const handleLogout = () => {
    actions.logout();
  
    // Cerrar el offcanvas correctamente
    const offcanvasElement = document.getElementById("offcanvasExample");
    if (offcanvasElement) {
      const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
      if (offcanvas) {
        offcanvas.hide();
      }
    }
  
    // Mover el foco fuera del offcanvas antes de redirigir
    document.activeElement?.blur(); // Quitar el foco del botón dentro del offcanvas
    document.body.focus(); // Opcionalmente, mover el foco al <body>
  
    // Redirigir al home
    navigate("/");
  };
  
  

  return (
    <>
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">
            Perfil del Usuario 🟢
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>

        <div className="offcanvas-body">
          <div className="d-flex flex-column align-items-center">
            <div className="card">
              <img
                src="https://png.pngtree.com/thumb_back/fh260/background/20230612/pngtree-male-avatar-image-in-the-circle-image_2908803.jpg"
                className="card-img-top"
                alt="avatar"
              />
              <div className="card-body text-center">
                <h6 className="offcanvas-title text-center">
                  Nombre usuario: {store.user?.name ?? ""}{" "}
                  {store.user?.last_name ?? ""}
                </h6>
              </div>
              <div className="card-body user-info">
                <h6 className="offcanvas-title text-center">
                  Correo: {store.user?.email ?? ""}
                </h6>
              </div>
              <button className="btn btn-danger mt-3" onClick={handleLogout}>
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};