import React from "react";
import "../../styles/userProfile.css";

export const UserProfile = () => {
  return (
    <>
      <button 
        type="button" 
        className="btn" 
        data-bs-toggle="offcanvas" 
        href="#offcanvasExample" 
        role="button" 
        aria-controls="offcanvasExample"
      >
        Perfil del Usuario
      </button>
      
      <div 
        className="offcanvas offcanvas-start" 
        tabIndex="-1" 
        id="offcanvasExample" 
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">
            Perfil del Usuario
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
                <h5 className="card-name">Name</h5>
              </div>
              <div className="card-body">
                <p className="card-email">Email</p>
                <p className="card-phonenumber">Phone</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
;
