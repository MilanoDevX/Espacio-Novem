import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import "/src/front/styles/register.css";
export const Register = () => {
    const navigate = useNavigate();
    const volver = () => {
        navigate("/");
        window.scrollTo(0, 0);
    };
    const { store, actions } = useContext(Context);
    const [name, setName] = useState("")
    const [last_name, setLast_name] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [confirmar, setConfirmar] = useState("")
    const [shown, setShown] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const switchShown = () => setShown(!shown); // eye
    const mensaje = (titulo) => {
        Swal.fire({
            icon: "error",
            title: "Error de ingreso",
            text: titulo,
        });
    };
    const chequeo = () => {
        if (name == "") {
            mensaje("Falta ingresar el nombre")
            return false
        }
        if (last_name == "") {
            mensaje("Falta ingresar el apellido")
            return false
        }
        if (phone == "") {
            mensaje("Falta ingresar el telefono")
            return false
        }
        if (email == "") {
            mensaje("Falta ingresar el email")
            return false
        }
        if (password == "") {
            mensaje("Falta ingresar el contraseña")
            return false
        }
        if (password.length > 20 || password.length < 8) {
            mensaje("El password debe contener de 8 a 20 caracteres")
            return false
        }
        if (confirmar == "") {
            mensaje("Falta ingresar la confirmacion de contraseña")
            return false
        }
        if (confirmar != password) {
            mensaje(" La contraseña no coincide con la confirmacion")
            return false
        }
        return true
    }
    const signup = async (e) => {
        e.preventDefault()
        console.log(isAdmin)
        let check = chequeo()
        if (check) {
            let newUser = {
                name: name,
                last_name: last_name,
                email: email,
                password: password,
                telefono: phone,
                is_admin: isAdmin,
            }
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

    const signIn = async (e) => {
        let usuario = {
            email: email,
            password: password,
        }
        let resp = await actions.login(usuario);
        if (resp) {
            navigate("/");
        }
    }

    const handleCheckboxChange = (e) => {
        setIsAdmin(e.target.checked);
    };
    return (
        <>
            <div className="mx-auto pt-3 register">
                <div className="text-center pt-5">
                    <h1 className="text-center">Registrarse</h1>
                </div>
                <div className="mb-2">
                    <div className="coolinput">
                        <label htmlFor="input" className="text">Nombre</label>
                        <input type="text" value={name} onChange={(event) => setName(event.target.value)} id="exampleFormControlInput1" placeholder="Escribe tu nombre aqui..." name="input" className="input" />
                    </div>
                </div>
                <div className="mb-2">
                    <div className="coolinput">
                        <label htmlFor="input" className="text">Apellido</label>
                        <input type="text" value={last_name} onChange={(event) => setLast_name(event.target.value)} id="exampleFormControlInput2" placeholder="Escribe tu apellido aqui..." name="input" className="input" />
                    </div>
                </div>
                <div className="mb-2">
                    <div className="coolinput">
                        <label htmlFor="input" className="text">Teléfono</label>
                        <input type="text" value={phone} onChange={(event) => setPhone(event.target.value)} id="exampleFormControlInput3" placeholder="Escribe tu teléfono aquí..." name="input" className="input" />
                    </div>
                </div>
                <div className="mb-2">
                    <div className="coolinput">
                        <label htmlFor="input" className="text">Correo Electronico</label>
                        <input type="text" value={email} onChange={(event) => setEmail(event.target.value)} id="exampleFormControlInput4" placeholder="Escribe tu correo  aqui..." name="input" className="input" />
                    </div>
                </div>
                <div className="mb-2">
                    <div className="coolinput password-input">
                        <label htmlFor="inputPassword5" className="text">Contraseña</label>
                        <div className="input-container">
                            <input
                                type={shown ? "text" : "password"}
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
                                onClick={switchShown}
                            >
                                <i className={`fa ${shown ? "fa-eye" : "fa-eye-slash"}`}></i>
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
                                type={shown ? "text" : "password"}
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
                                onClick={switchShown}
                            >
                                <i className={`fa ${shown ? "fa-eye" : "fa-eye-slash"}`}></i>
                            </button>
                        </div>
                        <span id="passwordHelpInline" className="form-text">
                            Debe contener de 8 a 20 caracteres.
                        </span>
                    </div>
                    <div className="form-check form-switch ">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="flexSwitchCheckDefault"
                            onChange={handleCheckboxChange}
                        />
                        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Eres Administrador?</label>
                    </div>
                </div>
            </div>
            <div className="text-center mb-4">
                <button type="button" className="boton" onClick={(event) => signup(event)}>Registrarse</button>
                <button type="button" className="boton" onClick={volver}>Volver</button>
            </div>
        </>
    );
};











