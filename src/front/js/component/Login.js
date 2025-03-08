import React, { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";


const Login = () => {
    const { actions, store } = useContext(Context);
    const [user, setUser] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const registerUser = () => {
        navigate("/register");
    };

    const loginUser = async (e) => {
        e.preventDefault()
        const resp = await actions.login(user);

        if (resp) {

            if (store.user.is_admin || store.user.email === "espacionovem@anda.com") {
                navigate("/admin");
            } else {
                navigate("/");
            }
     
            if (resp) {
                console.log("Usuario en el store:", store.user);
                if (store.user?.is_admin) {
                    navigate("/admin");
                }
            }
        };

    return (
        <div>
            {/* Dropdown for login */}
            <div className="btn-group dropstart">
                <button type="button" className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    Inicio Sesión
                </button>
                <ul className="dropdown-menu dos">
                    <div className="card-login p-3 dos" style={{ width: '25rem' }}>
                        <form className="body-inicio uno" onSubmit={loginUser}>
                            <div className="mb-4">
                                <label htmlFor="exampleInputEmail1" className="form-label">Correo Electrónico</label>
                                <input
                                    type="email"
                                    value={user.email}
                                    className="form-control form-control-lg dos"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    onChange={event => setUser({ ...user, email: event.target.value })}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
                                <input
                                    type="password"
                                    value={user.password}
                                    className="form-control form-control-lg dos"
                                    id="exampleInputPassword1"
                                    onChange={event => setUser({ ...user, password: event.target.value })}
                                    required
                                />
                            </div>
                            <div className="mb-4 form-check">
                                <Link to={"/register"} className="custom-link trans">
                                    <p>Registrarse</p>
                                </Link>
                            </div>
                            <div className="mb-4 form-check">
                                <Link to={"/send-email"} className="custom-link">
                                    <p>¿Olvidaste tu contraseña?</p>
                                </Link>
                            </div>
                            <div className="d-flex justify-content-end">
                                <button type="submit" className="button-pastel btndos">Ingresar</button>
                            </div>
                        </form>
                    </div>
                </ul>
            </div>
        </div>
    );
}
};

export default Login;