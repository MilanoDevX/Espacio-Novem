import React, { useContext, useState } from "react";
import { Context } from "../store/appContext"; 
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "/src/front/styles/sendEmail.css";
import mujer from "../../img/mujer.png";
import Swal from 'sweetalert2';

export const SendEmail = () => {
    const { actions } = useContext(Context); 
    const navigate = useNavigate();
    const [email, setEmail] = useState("");

   
    const mensaje = (titulo, icon = "error", title = "Error de ingreso") => {
        Swal.fire({
            icon: icon,
            title: title,
            text: titulo,
        });
    };

   
    const envio = async (e) => {
        e.preventDefault();

        if (email === "") {
            mensaje("Ingrese los datos solicitados");
            return;
        }

        
        let resp = await actions. recuperarPassword(email);
        if (!resp) {
            mensaje("Usuario no registrado");
            navigate("/register");
        } else {
            mensaje("Correo enviado con éxito", "success", "Revisa tu correo para restablecer tu contraseña");
        }
    };

    return (
        <>
            <div className="mt-5 mx-auto d-flex flex-wrap justify-content-center login">
                <div className="text-center">
                    <img className="loginimage m-2" src={mujer} alt="Descripción de la imagen" />
                </div>
                <form className="form content" style={{ width: "370px" }}>
                    <h3>Olvidaste tu Contraseña</h3>
                    <div className="mb-3">
                        <label className="form-label">Correo electrónico</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                        />
                    </div>

                    <div className="text-center">
                        <button type="button" onClick={(e) => envio(e)} className="btn btn-primary">
                            Enviar Correo
                        </button>
                    </div>

                    <div className="text-center mt-2">
                        <Link to={"/register"} className="customs-links">
                            <p>Registrarse</p>
                        </Link>
                    </div>
                </form>
            </div>
        </>
    );
};
