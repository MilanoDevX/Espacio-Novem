import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/login.css";

const Login = () => {
    const { actions, store } = useContext(Context);
    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: localStorage.getItem("rememberedEmail") || "",
        password: "",
        rememberMe: !!localStorage.getItem("rememberedEmail")
    });

    // Verificar si ya hay un token al cargar la página
    useEffect(() => {
        const token = localStorage.getItem("authToken"); // Asegúrate de que este es el nombre del token en el localStorage
        if (token) {
            // Si el token existe, redirigir al usuario
            navigate(store.user.is_admin ? "/admin" : "/");
        }
    }, [navigate, store.user.is_admin]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const loginUser = async (e) => {
        e.preventDefault();
        const resp = await actions.login(user);

        if (resp) {
            const token = resp.token; // Asegúrate de que el backend devuelve un token
            if (token) {
                localStorage.setItem("authToken", token); // Guardar el token en el localStorage
            }

            if (user.rememberMe) {
                localStorage.setItem("rememberedEmail", user.email);
            } else {
                localStorage.removeItem("rememberedEmail");
            }

            navigate(store.user.is_admin ? "/admin" : "/");
        }
    };

    return (
        <div>
            <div className="btn-group dropstart">
                <button
                    type="button"
                    className="btn btn-secondary dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    Inicio Sesión
                </button>
                <ul className="dropdown-menu inicio">
                    <div className="card-login p-3" style={{ width: "25rem" }}>
                        <form className="body-inicio uno">
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">
                                    Correo Electrónico
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={user.email}
                                    className="form-control form-control-lg dos"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">
                                    Contraseña
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={user.password}
                                    className="form-control form-control-lg dos"
                                    id="exampleInputPassword1"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3 form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="rememberMe"
                                    name="rememberMe"
                                    checked={user.rememberMe}
                                    onChange={handleChange}
                                />
                                <label className="form-check-label" htmlFor="rememberMe">
                                    Recordar usuario
                                </label>
                            </div>

                            <div className="mb-3">
                                <Link to={"/register"} className="custom-link trans">
                                    <p>Regístrate</p>
                                </Link>
                            </div>
                            <div className="mb-3">
                                <Link to={"/send-email"} className="custom-link">
                                    <p>¿Olvidaste tu contraseña?</p>
                                </Link>
                            </div>

                            <div className="d-flex justify-content-end">
                                <button className="button-pastel btndos" onClick={loginUser}>
                                    Ingresar
                                </button>
                            </div>
                        </form>
                    </div>
                </ul>
            </div>
        </div>
    );
};

export default Login;
