import React from "react";
import "../../styles/inicioSesion.css";
import image from '../../img/image.png';
import { useNavigate } from 'react-router-dom';

export const InicioSesion = () => {
  
const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/contactMap');
      };


  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="col-10 col-sm-8 col-md-6 col-lg-5 col-xl-4">


        <div className="mb-4 text-center">
          <img
            src={image}
            alt="Logo"
            className="img-fluid logo-imagen"
          />
        </div>

        <form className="body-inicio">
          <div className="mb-4">
            <label htmlFor="exampleInputEmail1" className="form-label">Correo Electrónico</label>
            <input
              type="email"
              className="form-control form-control-lg"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control form-control-lg"
              id="exampleInputPassword1"
            />
          </div>

          <div className="mb-4 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              He olvidado la contraseña
            </label>
          </div>
{/* tiene que ir a pagina principal */}
          <div className="d-flex justify-content-end">
          <button className="button-pastel" onClick={handleNavigate}>Ingresar</button> 
          </div>

        </form>
      </div>
    </div>
  );
};
