import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import "/src/front/styles/register.css";

export const Register = () => {
    const navigate = useNavigate();
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
    const [errors, setErrors] = useState({});

    const volver = () => {
        navigate("/");
        window.scrollTo(0, 0);
    };

    const mensaje = (titulo) => {
        Swal.fire({
            icon: "error",
            title: "Error de ingreso",
            text: titulo,
        });
    };

    const validateFields = () => {
        const newErrors = {};

        if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]{2,}$/.test(name)) {
            newErrors.name = "Nombre inválido (mínimo 3 letras, solo texto).";
        }
        if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]{2,}$/.test(last_name)) {
            newErrors.last_name = "Apellido inválido (mínimo 3 letras, solo texto).";
        }
        if (!/^\d{6,15}$/.test(phone)) {
            newErrors.phone = "Teléfono inválido (6 a 15 números).";
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.toLowerCase())) {
            newErrors.email = "Correo electrónico inválido.";
        }
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,20}$/.test(password)) {
            newErrors.password = "Contraseña inválida (8-20 caracteres, al menos 1 minúscula, 1 mayúscula y 1 número).";
        }
        
        if (confirmar !== password) {
            newErrors.confirmar = "Las contraseñas no coinciden.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const signup = async (e) => {
        e.preventDefault();
        if (validateFields()) {
            const newUser = {
                name,
                last_name,
                email: email.toLowerCase(),
                password,
                telefono: phone,
                is_admin: isAdmin
            };

            const resp = await actions.signup(newUser);
            if (resp === true) {
                Swal.fire({
                    icon: "success",
                    title: "Registro exitoso",
                    text: "Ahora puedes iniciar sesión.",
                    timer: 2000,
                    showConfirmButton: false
                }).then(() => signIn());
            } else {
                if (resp.msg?.toLowerCase().includes("email")) {
                    mensaje("El correo ya está registrado.");
                } else {
                    mensaje("Hubo un error en el registro.");
                }
            }
        }
    };

    const signIn = async () => {
        const usuario = {
            email: email.toLowerCase(),
            password,
        };
        const resp = await actions.login(usuario);
        if (resp) {
            navigate("/");
        }
    };

    const switchShownPassword = () => setShownPassword(!shownPassword);
    const switchShownConfirm = () => setShownConfirm(!shownConfirm);

    return (
        <div className="mx-auto pt-3 register">
            <div className="text-center pt-5">
                <h1 className="text-center">Registrarse</h1>
            </div>

            {/* Nombre */}
            <div className="mb-2">
                <div className="coolinput">
                    <label className="text">Nombre</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={`input ${errors.name ? "input-error" : ""}`}
                        placeholder="Escribe tu nombre aquí..."
                    />
                    {errors.name && <p className="error-text">{errors.name}</p>}
                </div>
            </div>

            {/* Apellido */}
            <div className="mb-2">
                <div className="coolinput">
                    <label className="text">Apellido</label>
                    <input
                        type="text"
                        value={last_name}
                        onChange={(e) => setLast_name(e.target.value)}
                        className={`input ${errors.last_name ? "input-error" : ""}`}
                        placeholder="Escribe tu apellido aquí..."
                    />
                    {errors.last_name && <p className="error-text">{errors.last_name}</p>}
                </div>
            </div>

            {/* Teléfono */}
            <div className="mb-2">
                <div className="coolinput">
                    <label className="text">Teléfono</label>
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className={`input ${errors.phone ? "input-error" : ""}`}
                        placeholder="Escribe tu teléfono aquí..."
                    />
                    {errors.phone && <p className="error-text">{errors.phone}</p>}
                </div>
            </div>

            {/* Email */}
            <div className="mb-2">
                <div className="coolinput">
                    <label className="text">Correo Electrónico</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`input ${errors.email ? "input-error" : ""}`}
                        placeholder="Escribe tu correo aquí..."
                    />
                    {errors.email && <p className="error-text">{errors.email}</p>}
                </div>
            </div>

            {/* Contraseña */}
            <div className="mb-2">
                <div className="coolinput password-input">
                    <label className="text">Contraseña</label>
                    <div className="input-container">
                        <input
                            type={shownPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`input ${errors.password ? "input-error" : ""}`}
                            placeholder="Escribe tu contraseña aquí..."
                        />
                        <button type="button" className="eye" onClick={switchShownPassword}>
                            <i className={`fa ${shownPassword ? "fa-eye" : "fa-eye-slash"}`}></i>
                        </button>
                    </div>
                    <span className="form-text">Debe contener de 8 a 20 caracteres, una mayúscula, una minúscula y un número.</span>
                    {errors.password && <p className="error-text">{errors.password}</p>}
                </div>
            </div>

            {/* Confirmar contraseña */}
            <div className="mb-3">
                <div className="coolinput password-input">
                    <label className="text">Confirmar Contraseña</label>
                    <div className="input-container">
                        <input
                            type={shownConfirm ? "text" : "password"}
                            value={confirmar}
                            onChange={(e) => setConfirmar(e.target.value)}
                            className={`input ${errors.confirmar ? "input-error" : ""}`}
                            placeholder="Repite tu contraseña aquí..."
                        />
                        <button type="button" className="eye" onClick={switchShownConfirm}>
                            <i className={`fa ${shownConfirm ? "fa-eye" : "fa-eye-slash"}`}></i>
                        </button>
                    </div>
                    {errors.confirmar && <p className="error-text">{errors.confirmar}</p>}
                </div>
            </div>

            <div className="text-center mb-4">
                <button type="button" className="boton" onClick={signup}>Registrarse</button>
                <button type="button" className="boton" onClick={volver}>Volver</button>
            </div>
        </div>
    );
};
