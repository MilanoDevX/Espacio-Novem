import React from "react";
import "../../styles/userProfile.css";
import { useNavigate } from "react-router-dom";
export const UserProfile = () => {
  const navigate = useNavigate();
  const handleLogout = ()=>{
    navigate("/")
  }
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
                <h5 className="card-name user-info">Name</h5>
              </div>
              <div className="card-body user-info">
                <p className="card-email user-info">Email</p>
                <p className="card-phonenumber user-info">Phone</p>
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
;
