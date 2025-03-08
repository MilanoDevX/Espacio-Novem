const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            message: null,
            user: null,
            token: null,
            auth: false,
        },
        actions: {
            login: async (email, password) => {
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/login`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ email, password }) 
                    });

                    const data = await resp.json();
                    console.log("Respuesta del servidor:", data);

                    if (!resp.ok) throw new Error(data.msg || "Error en la autenticación");

                    setStore({ user: data.user, token: data.access_token, auth: true });
                    localStorage.setItem("access_token", data.access_token);
                    return { status: true, rol: data.user.is_admin };
                } catch (error) {
                    console.error("Error en la solicitud:", error.message);
                    setStore({ auth: false });
                    return { status: false, error: error.message };
                }
            },

            logout: () => {
                localStorage.removeItem("access_token");
                setStore({ user: null, token: null, auth: false });
                console.log("Sesión cerrada");
            },

            signup: async (user) => {
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/signup`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(user)
                    });
                    
                    if (!resp.ok) throw new Error("Error en el registro");
                    return true;
                } catch (error) {
                    console.error("Error en el registro:", error.message);
                    return false;
                }
            },

            resetPassword: async (email) => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/send-email`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ email }),
                    });

                    return response.ok;
                } catch (error) {
                    console.error("Error en resetPassword:", error.message);
                    return false;
                }
            },

            recoverPassword: async (email, nueva, aleatoria) => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/recuperar-password`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ email, nueva, aleatoria }),
                    });

                    return response.ok;
                } catch (error) {
                    console.error("Error en recoverPassword:", error.message);
                    return false;
                }
            },

            getProfile: async () => {
                try {
                    const token = localStorage.getItem("access_token");
                    if (!token) return false;

                    const response = await fetch(`${process.env.BACKEND_URL}/userProfile`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        },
                    });

                    if (!response.ok) throw new Error("No se pudo obtener el perfil");
                    
                    const data = await response.json();
                    setStore({ user: data });
                    return true;
                } catch (error) {
                    console.error("Error en getProfile:", error.message);
                    return false;
                }
            },
        },
    };
};

export default getState;