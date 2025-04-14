import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import "/src/front/styles/sendEmail.css";
import mujer from "../../img/mujer.png";
import Swal from 'sweetalert2';

export const SendEmail = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");

    const mensaje = (titulo, icon = "error", title = "Error de ingreso") => {
        Swal.fire({
            icon: icon,
            title: title,
            text: titulo,
            timer: 2000,
            showConfirmButton: false
        });
    };

    const envio = async (e) => {
        e.preventDefault();
        if (email === "") {
            mensaje("Ingrese los datos solicitados");
            return;
        }

        let resp = await actions.restablecerPassword(email);

        if (resp) {
            mensaje("Correo enviado con éxito", "success", "¡Listo!");
            setTimeout(() => navigate("/reset-password"), 2000); // espera que el usuario vea el mensaje
        } else {
            mensaje("Usuario no registrado");
            setTimeout(() => navigate("/register"), 2000);
        }
    };

    return (
        <div className="login-container">
            <div className="login-content">
                <div className="image-container text-center">
                    <img className="loginimage" src={mujer} alt="Descripción de la imagen" />
                </div>
                <form className="form-content" onSubmit={envio}>
                    <h3>¿Olvidaste tu Contraseña?</h3>
                    <div className="mb-3">
                        <label className="form-label">Correo electrónico</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                        />
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary boton">
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
        </div>
    );
};
