import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import "/src/front/styles/sendEmail.css";

import mujerbombilla from "../../img/mujerbombilla.webp";
import Swal from "sweetalert2";

export const ResetPassword = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [aleatoria, setAleatoria] = useState("");
    const [nueva, setNueva] = useState("");

    const mensaje = (titulo, icon = "error", title = "Error de ingreso") => {
        Swal.fire({
            icon: icon,
            title: title,
            text: titulo,
        });
    };

    const envio = async (e) => {
        e.preventDefault();

        // Validaciones
        if (email === "") {
            mensaje("Ingrese su correo electrónico.");
            return;
        }
        if (aleatoria === "") {
            mensaje("Ingrese su contraseña enviada por email.");
            return;
        }
        if (nueva === "") {
            mensaje("Ingrese su nueva contraseña.");
            return;
        }

        // Llamada a la acción de recuperación de contraseña
        let resp = await actions.recuperarPassword(email, nueva, aleatoria);
        if (resp) {
            mensaje("Contraseña actualizada con éxito", "success", "Contraseña cambiada");

            let user = {
                email: email,
                password: nueva,
            };

            let respLogin = await actions.login(user);
            if (respLogin) {
                navigate("/");
            }
        }
    };

    return (
        <div className="mt-5 mx-auto d-flex flex-wrap justify-content-center login">
            <div className="text-center">
                <img className="loginimage" src={mujerbombilla} alt="Descripción de la imagen" />
            </div>
            <form className="form content" style={{ width: "370px" }}>
                <h3>Cambio de Contraseña</h3>
                <div className="mb-3">
                    <label className="form-label">Ingrese su Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control"
                        aria-describedby="emailHelp"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Contraseña Enviada Por Email</label>
                    <input
                        type="password"
                        value={aleatoria}
                        onChange={(e) => setAleatoria(e.target.value)}
                        className="form-control"
                        aria-describedby="emailHelp"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Ingrese su Nueva Contraseña</label>
                    <input
                        type="password"
                        value={nueva}
                        onChange={(e) => setNueva(e.target.value)}
                        className="form-control"
                        aria-describedby="emailHelp"
                    />
                </div>
                <div className="text-center">
                    <button type="button" onClick={envio} className="btn btn-primary">
                        Cambiar Contraseña
                    </button>
                </div>
                <div className="text-center mt-2">
                    <Link to={"/register"} className="customs-links">
                        <p>Registrarse</p>
                    </Link>
                </div>
            </form>
        </div>
    );
};
