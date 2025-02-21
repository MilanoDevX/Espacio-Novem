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
                try {
                    const response = await fetch('/api/recuperar-password', {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ email, nueva, aleatoria }),
                    });
        
                    if (!response.ok) {
                        throw new Error('Error al actualizar la contraseña');
                    }
        
                    const data = await response.json();
                    return data; // Debes retornar lo que recibes del servidor
                } catch (error) {
                    console.error(error);
                    return null;  // En caso de error
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
