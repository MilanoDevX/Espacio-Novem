import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import "/src/front/styles/register.css";

export const Register = () => {
    const navigate = useNavigate();
    const volver = () => {
        navigate("/");
        window.scrollTo(0, 0);
    };

    const { store, actions } = useContext(Context);
    const [name, setName] = useState("");
    const [last_name, setLast_name] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmar, setConfirmar] = useState("");
    const [shownPassword, setShownPassword] = useState(false);
    const [shownConfirm, setShownConfirm] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const mensaje = (titulo) => {
        Swal.fire({
            icon: "error",
            title: "Error de ingreso",
            text: titulo,
        });
    };

    const chequeo = () => {
        if (name == "") {
            mensaje("Falta ingresar el nombre");
            return false;
        }
        if (last_name == "") {
            mensaje("Falta ingresar el apellido");
            return false;
        }
        if (phone == "") {
            mensaje("Falta ingresar el teléfono");
            return false;
        }
        if (email == "") {
            mensaje("Falta ingresar el email");
            return false;
        }
        if (password == "") {
            mensaje("Falta ingresar la contraseña");
            return false;
        }
        if (password.length > 20 || password.length < 8) {
            mensaje("La contraseña debe contener de 8 a 20 caracteres");
            return false;
        }
        if (confirmar == "") {
            mensaje("Falta ingresar la confirmación de contraseña");
            return false;
        }
        if (confirmar != password) {
            mensaje("La contraseña no coincide con la confirmación");
            return false;
        }
        return true;
    };

    const signup = async (e) => {
        e.preventDefault();
        let check = chequeo();
        if (check) {
            let newUser = {
                name: name,
                last_name: last_name,
                email: email,
                password: password,
                telefono: phone,
                is_admin: isAdmin,
            };
            let resp = await actions.signup(newUser);
            if (resp) {
                Swal.fire({
                    icon: "success",
                    title: "Registro exitoso",
                    text: "Ahora puedes iniciar sesión.",
                    timer: 2000,
                    showConfirmButton: false
                }).then(() => {
                    signIn();
                });
            } else {
                mensaje("Hubo un error en el registro");
            }
        }
    };

    const signIn = async () => {
        let usuario = {
            email: email,
            password: password,
        };
        let resp = await actions.login(usuario);
        if (resp) {
            navigate("/");
        }
    };

    // Funciones para alternar la visibilidad de las contraseñas
    const switchShownPassword = () => setShownPassword(!shownPassword);
    const switchShownConfirm = () => setShownConfirm(!shownConfirm);

    return (
        <>
            <div className="mx-auto pt-3 register">
                <div className="text-center pt-5">
                    <h1 className="text-center">Registrarse</h1>
                </div>

                <div className="mb-2">
                    <div className="coolinput">
                        <label htmlFor="input" className="text">Nombre</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            id="exampleFormControlInput1"
                            placeholder="Escribe tu nombre aquí..."
                            name="input"
                            className="input"
                        />
                    </div>
                </div>

                <div className="mb-2">
                    <div className="coolinput">
                        <label htmlFor="input" className="text">Apellido</label>
                        <input
                            type="text"
                            value={last_name}
                            onChange={(event) => setLast_name(event.target.value)}
                            id="exampleFormControlInput2"
                            placeholder="Escribe tu apellido aquí..."
                            name="input"
                            className="input"
                        />
                    </div>
                </div>

                <div className="mb-2">
                    <div className="coolinput">
                        <label htmlFor="input" className="text">Teléfono</label>
                        <input
                            type="text"
                            value={phone}
                            onChange={(event) => setPhone(event.target.value)}
                            id="exampleFormControlInput3"
                            placeholder="Escribe tu teléfono aquí..."
                            name="input"
                            className="input"
                        />
                    </div>
                </div>

                <div className="mb-2">
                    <div className="coolinput">
                        <label htmlFor="input" className="text">Correo Electrónico</label>
                        <input
                            type="text"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            id="exampleFormControlInput4"
                            placeholder="Escribe tu correo aquí..."
                            name="input"
                            className="input"
                        />
                    </div>
                </div>

                <div className="mb-2">
                    <div className="coolinput password-input">
                        <label htmlFor="inputPassword5" className="text">Contraseña</label>
                        <div className="input-container">
                            <input
                                type={shownPassword ? "text" : "password"}
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                id="inputPassword5"
                                placeholder="Escribe tu contraseña aquí..."
                                name="input"
                                className="input"
                            />
                            <button
                                type="button"
                                className="eye"
                                onClick={switchShownPassword}
                            >
                                <i className={`fa ${shownPassword ? "fa-eye" : "fa-eye-slash"}`}></i>
                            </button>
                        </div>
                        <span id="passwordHelpInline" className="form-text">
                            Debe contener de 8 a 20 caracteres.
                        </span>
                    </div>
                </div>

                <div className="mb-3">
                    <div className="coolinput password-input">
                        <label htmlFor="inputPassword6" className="text">Confirmar Contraseña</label>
                        <div className="input-container">
                            <input
                                type={shownConfirm ? "text" : "password"}
                                value={confirmar}
                                onChange={(event) => setConfirmar(event.target.value)}
                                id="inputPassword6"
                                placeholder="Escribe tu contraseña aquí..."
                                name="input"
                                className="input"
                            />
                            <button
                                type="button"
                                className="eye"
                                onClick={switchShownConfirm}
                            >
                                <i className={`fa ${shownConfirm ? "fa-eye" : "fa-eye-slash"}`}></i>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="text-center mb-4">
                    <button type="button" className="boton" onClick={signup}>Registrarse</button>
                    <button type="button" className="boton" onClick={volver}>Volver</button>
                </div>
            </div>
        </>
    );
};
