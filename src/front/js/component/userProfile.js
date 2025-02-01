import React, { useContext } from "react";
import "../../styles/userProfile.css";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const UserProfile = () => {
  const { actions, store } = useContext(Context);

  const navigate = useNavigate();

  const handleLogout = () => {
    actions.logout(); 
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
                <h6 className="offcanvas-title text-center" id="offcanvasScrollingLabel">
                  Nombre usuario: {store.user?.name || "Fiorella"}{" "}
                  {store.user?.last_name || "Martinez"}
                </h6>
              </div>
              <div className="card-body user-info">
                <h6 className="offcanvas-title text-center" id="offcanvasScrollingLabel">
                  Correo: {store.user?.email || "fio@gmail.com"}
                </h6>
                <h6 className="offcanvas-title text-center" id="offcanvasScrollingLabel">
                  N° telefono: {store.user?.num_telefono || "0303456 lalala"}
                </h6>
              </div>
              <button
                className="btn btn-danger mt-3"
                onClick={handleLogout}
              >
                Cerrar sesión
              </button>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};
