const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            user: null,
            token: null,
            auth: false
        },
        actions: {
            login: async (email, password) => {
                try {
                    const response = await fetch("http://localhost:3001/login", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ email, password })
                    });
            
                    if (response.ok) {
                        const data = await response.json();
                        localStorage.setItem("token", data.token);
                        setStore({ auth: true });
            
                        getActions().getUserProfile(); 
                        return true;
                    }
                    return false;
                } catch (error) {
                    console.error("Error en login:", error);
                    return false;
                }
            },
            

            signup: async (user) => {
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/signup`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(user),
                    });
            
                    const data = await resp.json();
                    if (!resp.ok) {
                        console.error("Error en el backend:", data);
                    }
                    return data;
                } catch (error) {
                    console.error("Error en la solicitud:", error);
                }
            },
            

            recuperarPassword: async (email, nueva, aleatoria) => {
                console.log(email, nueva, aleatoria);
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/recuperar-password`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ email, nueva, aleatoria }),
                    });

                    if (response.status === 200) {
                        console.log("Contraseña actualizada correctamente");
                        return true;
                    } else {
                        const data = await response.json();
                        console.error("Error en el backend:", data.message || "No se pudo actualizar la contraseña");
                        return false;
                    }
                } catch (error) {
                    console.log("Error en la solicitud:", error);
                    return false;
                }
            },
            getUserProfile: async () => {
                try {
                    const token = localStorage.getItem("token"); 
                    if (!token) return;
            
                    const response = await fetch("http://localhost:5000/user/profile", {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            "Content-Type": "application/json"
                        }
                    });
            
                    if (response.ok) {
                        const data = await response.json();
                        setStore({ user: data });
                    }
                } catch (error) {
                    console.error("Error obteniendo perfil:", error);
                }
            }
            
        }
    };
};

export default getState;
