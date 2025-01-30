import React, {useContext,useState} from "react";
import "../../styles/inicioSesion.css";
import image from '../../img/image.png';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";


export const InicioSesion = () => {
  const { store, actions } = useContext(Context);
const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/contactMap');
      };
      
	const [user, setUser] = useState({ email: "" })

	const loginUser = async () => {
		const resp = await actions.login(user)
		if (resp.status && !resp.rol) {
			navigate("/menu")
		}

		if (resp) {
			console.log(store.user)
			if(store.user.is_admin){
				navigate("/admin")
			}
			
			if(user.email == "espacionovem@gmail.com"){
				navigate("/admin")
			}
		}
	}


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
              value={user.email || ""} 
              className="form-control form-control-lg"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={event => setUser({
								...user,
								email: event.target.value
							})}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
            <input
              type="password"
              value={user.password || ""}
              className="form-control form-control-lg"
              id="exampleInputPassword1"
              onChange={event => setUser({
								...user,
								password: event.target.value
							})}
            />
          </div>

          <div className="mb-4 form-check">
          <Link to= {"/register"} className="custom-link trans">
						<p className="">¿Olvidaste tu contraseña?</p>
						</Link>
          </div>
{/* tiene que ir a pagina principal */}
          <div className="d-flex justify-content-end">
          <button className="button-pastel"onClick={() =>
								loginUser()
							} >Ingresar</button> 
          </div>

        </form>
      </div>
    </div>
  );
};
