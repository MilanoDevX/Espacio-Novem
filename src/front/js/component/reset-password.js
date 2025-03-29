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
    const [shown, setShown] = useState(false); 
    const [shownAleatoria, setShownAleatoria] = useState(false); 

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
        if (nueva.length > 20 || nueva.length < 8) {
            mensaje("La nueva password debe contener de 8 a 20 caracteres");
            return false;
        }

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

    const switchShown = (field) => {
        if (field === 'aleatoria') {
            setShownAleatoria(prev => !prev);
        } else if (field === 'nueva') {
            setShown(prev => !prev);
        }
    };

    return (
        <div className="mt-5 mx-auto d-flex flex-wrap justify-content-center login">
            <div className="text-center">
                <img className="loginimage" src={mujerbombilla} alt="Descripción de la imagen" />
            </div>
            <form className="form content" style={{ width: "370px" }}>
                <h3>Cambio de Contraseña</h3>
                
                {/* Email Input */}
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

                {/* Contraseña Enviada por Email */}
                <div className="mb-3">
                    <label className="form-label">Contraseña Enviada Por Email</label>
                    <div className="password-input">
                        <div className="input-container">
                            <input
                                type={shownAleatoria ? "text" : "password"}
                                value={aleatoria}
                                onChange={(e) => setAleatoria(e.target.value)}
                                className="form-control input"
                                aria-describedby="emailHelp"
                            />
                            <button
                                type="button"
                                className="eye"
                                onClick={() => switchShown("aleatoria")}
                            >
                                <i className={`fa ${shownAleatoria ? "fa-eye" : "fa-eye-slash"}`}></i>
                            </button>
                        </div>
                        <span className="form-text">
                            Debe contener de 8 a 20 caracteres.
                        </span>
                    </div>
                </div>

                {/* Nueva Contraseña */}
                <div className="mb-3">
                    <label className="form-label">Ingrese su Nueva Contraseña</label>
                    <div className="password-input">
                        <div className="input-container">
                            <input
                                type={shown ? "text" : "password"}
                                value={nueva}
                                onChange={(e) => setNueva(e.target.value)}
                                className="form-control input"
                                aria-describedby="emailHelp"
                            />
                            <button
                                type="button"
                                className="eye"
                                onClick={() => switchShown("nueva")}
                            >
                                <i className={`fa ${shown ? "fa-eye" : "fa-eye-slash"}`}></i>
                            </button>
                        </div>
                        <span className="form-text">
                            Debe contener de 8 a 20 caracteres.
                        </span>
                    </div>
                </div>

                {/* Botón de envío */}
                <div className="text-center">
                    <button type="button" onClick={envio} className="btn btn-primary boton">
                        Cambiar Contraseña
                    </button>
                </div>

                {/* Enlace a registro */}
                <div className="text-center mt-2">
                    <Link to={"/register"} className="customs-links">
                        <p>Registrarse</p>
                    </Link>
                </div>
            </form>
        </div>
    );
};