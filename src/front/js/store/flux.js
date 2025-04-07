const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            user: { email: "" },
        },
        actions: {
            login: async (useNew) => {
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/login`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(useNew),
                    });
                    if (!resp.ok) {
                        setStore({ auth: false });
                        return false, { status: false };
                    }
                    const data = await resp.json();
                    if (data.access_token) {
                        localStorage.setItem("access_token", data.access_token);
                        setStore({ user: data.user, token: data.access_token, auth: true });
                        return true, { status: true, rol: data.user.is_admin };
                    } else {
                        setStore({ auth: false });
                        return false, { status: false };
                    }
                } catch (error) {
                    console.error("Error en la solicitud:", error);
                    setStore({ auth: false });
                    return false, { status: false };
                }
            },
            signup: async (user) => {
                try {
                    const resp = await fetch(process.env.BACKEND_URL + "/signup", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(user)
                    })
                    // console.log(resp)
                    if (resp.status == 201) {
                        return true;
                    } else {
                        return false
                    }
                } catch (error) {
                    console.log("Error loading message from backend", error)
                }
            },
            logout: () => {
                localStorage.removeItem("access_token");
                setStore({ user: null, token: null, auth: false });
                console.log("Sesión cerrada");
            },
            restablecerPassword: async (email) => {
                try {

                    const response = await fetch(process.env.BACKEND_URL + "/send-email", {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            email: email
                        }),
                    });
                    console.log(response);
                    if (response.status == 200) {
                        return true;
                    }
                    if (response.status == 404) {
                        return false;
                    }
                } catch (error) {
                    console.log(error);
                    return false;
                }

            },

            recuperarPassword: async (email, nueva, aleatoria) => {
                console.log("Enviando datos:", email, nueva, aleatoria);
                try {
                    const url = process.env.BACKEND_URL + "/reset-password";
                    console.log("URL de la API:", url);

                    const response = await fetch(url, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ email, nueva, aleatoria }),
                    });

                    console.log("Respuesta recibida:", response.status, response.statusText);

                    if (response.ok) {
                        return true;
                    }
                    return false;
                } catch (error) {
                    console.error("Error en la solicitud:", error);
                    return false;
                }
            },

            getProfile: async () => {
                try {
                    const token = localStorage.getItem("access_token");
                    if (!token) {
                        setStore({ user: null, token: null, auth: false });
                        return false;
                    }
            
                    const response = await fetch(process.env.BACKEND_URL + "/userProfile", {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + token
                        },
                    });
            
                    if (response.status == 401) {
                        setStore({ user: null, token: null, auth: false });
                        localStorage.removeItem("access_token");
                        return false;
                    }
            
                    if (response.ok) {
                        const data = await response.json();
                        setStore({ user: data });
                        return true;
                    }
                } catch (error) {
                    console.error("Error obteniendo el perfil:", error);
                    return false;
                }
            },
            

            getReservationsByEmail: async () => {
                try {
                    const token = localStorage.getItem("access_token");
                    const response = await fetch(process.env.BACKEND_URL + "/reservations", {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + token
                        },
                    });
                    // console.log(response);
                    if (response.status == 200) {
                        const data = await response.json();

                        // console.log("Reservas", data);
                        setStore({ reservations: data });
                        return data;
                    } else {
                        console.error("Error al obtener las reservas:", response.status);
                        return false;
                    }
                } catch (error) {
                    console.error("Error al traer reservas:", error);
                    return false
                }
            },

            deleteReservation: async (id) => {
                try {
                    const token = localStorage.getItem("access_token");
                    const response = await fetch(process.env.BACKEND_URL + "/reservations", {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + token
                        },
                        body: JSON.stringify({ reserva_id: id })
                    });
                    // console.log(response);
                    if (response.status == 200) {
                        console.log("Reserva borrada exitosamente");
                        return true;
                    } else {
                        console.error("Error al borrar la reserva:", response.statusText);
                        return false;
                    }
                } catch (error) {
                    console.error("Error al borrar la reserva:", error);
                    return false;
                }
            },

            getReservationsAdmin: async () => {
                try {
                    const token = localStorage.getItem("access_token");
                    const response = await fetch(process.env.BACKEND_URL + "/admin", {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + token
                        },
                    });
                    // console.log(response);
                    if (response.status == 200) {
                        const data = await response.json();

                        // console.log("Reservas", data);
                        setStore({ reservations: data });
                        return data;
                    } else {
                        console.error("Error al obtener las reservas:", response.status);
                        return false;
                    }
                } catch (error) {
                    console.error("Error al traer reservas:", error);
                    return false
                }
            },
            getReservations: async () => {
                try {
                    const token = localStorage.getItem("access_token");
                    const response = await fetch(process.env.BACKEND_URL + "/reservations", {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + token
                        },
                    });
                    if (response.status == 200) {
                        const data = await response.json();
                        setStore({ reservations: data });
                        return data;
                    } else {
                        console.error("Error al obtener las reservas:", response.status);
                        return false;
                    }
                } catch (error) {
                    console.error("Error al obtener las reservas:", error);
                    return false;
                }
            },
            

            submitReservations: async (selectedReservations) => {
                try {
                    const token = localStorage.getItem("access_token");
                    const response = await fetch(process.env.BACKEND_URL + "/reservations", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + token
                        },
                        body: JSON.stringify(selectedReservations)
                    });

                    if (!response.ok) {
                        throw new Error(
                          `Error al guardar las reservas: ${response.statusText}`
                        );
                      }

                    if (response.status == 200) {
                        return true;
                    } else {
                        return false;
                    }
                } catch (error) {
                    console.log("Error al guardar las reservas:", error);
                    return false;
                }
            }
        }
    };
};
export default getState;



