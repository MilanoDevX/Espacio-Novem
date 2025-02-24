import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "/src/front/styles/sendEmail.css";
import mujerbombilla from "../../img/mujerbombilla.webp";
import Swal from 'sweetalert2';

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

        // Validación de campos
        if (email === "") {
            mensaje("Ingrese su email");
            return;
        }
        if (aleatoria === "") {
            mensaje("Ingrese la contraseña enviada por email");
            return;
        }
        if (nueva === "") {
            mensaje("Ingrese su nueva contraseña");
            return;
        }

        try {
            let resp = await actions.recuperarPassword(email, nueva, aleatoria);

            // Verificación de respuesta de backend
            if (resp && resp.status === "success") {
                mensaje("Contraseña actualizada con éxito", "success", "¡Ya tienes tu nueva contraseña!");
                
                // Realizamos login después de actualizar la contraseña
                let user = {
                    email: email,
                    password: nueva,
                };
                let respLogin = await actions.login(user);

                if (respLogin && respLogin.status === "success") {
                    navigate("/");  // Redirige al inicio después de login exitoso
                } else {
                    mensaje("Error al iniciar sesión con la nueva contraseña.");
                }
            } else {
                mensaje(resp?.message || "Hubo un error al actualizar la contraseña");
            }
        } catch (error) {
            console.error(error);
            mensaje("Error al procesar la solicitud. Intenta nuevamente.");
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
                        id="exampleInputEmail1"
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
                        id="exampleInputEmail1"
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
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                    />
                </div>
                <div className="text-center">
                    <button type="button" onClick={envio} className="btn btn-primary">
                        Resetear
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
