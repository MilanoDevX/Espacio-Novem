import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"




import Swal from 'sweetalert2'

export const SendEmail = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const mensaje = (titulo, icon = "error", title = "error de ingreso") => {
        Swal.fire({
            icon: icon,
            title: title,
            text: titulo,

        });
    }
    const envio = async (e) => {
        e.preventDefault()
        if (email == "") {
            mensaje("Ingrese los datos solicitados")
            return
        }
        let resp = await actions.restablecerPassword(email)
        if (resp) {

        } else {
            mensaje("Usuario no registrado")
            navigate("/register")
        }
    }
    return (
        <>
         
            <div className="mt-5 mx-auto d-flex flex-wrap justify-content-center login" >

                <div className="text-center">
                    <img className="loginimage m-2" src="https://static.vecteezy.com/system/resources/thumbnails/009/493/294/small/the-concept-of-a-man-thinking-behind-a-laptop-vector.jpg" alt="Descripción de la imagen" />
                </div>
                <form className="form content" style={{ width: "370px" }}>
                    <h3>Olvidaste tu Contraseña</h3>
                    <div className="mb-3">
                        <label className="form-label">Correo electrónico</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>

                    <div className="text-center">

                        <button type="button" onClick={(e) => envio(e)} className="btn btn-primary"><Link className="custom-link text-light " to={"/recuperar-password"}>
                            Enviar Correo
                        </Link>
                        </button>

                    </div>

                    <div className="text-center mt-2">
                        <Link to={"/register"}>
                            <p className="text-info">Registrarse</p>
                        </Link>
                    </div>

                </form>
            </div>
        </>
    );
};
