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
                // console.log(user)
                // console.log(process.env.BACKEND_URL+"/signup")
                try {
                    // fetching data from the backend
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
                console.log(email, nueva, aleatoria)
                try {
                    const response = await fetch(process.env.BACKEND_URL + "/recuperar-password", {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            email,
                            nueva,
                            aleatoria
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
            getProfile: async () => {
				try {
					const token = localStorage.getItem("access_token");
					if(!token){
						return false
					}
					const response = await fetch(process.env.BACKEND_URL + "/userProfile", {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							"Authorization": "Bearer " + token
						},

					});
					console.log(response);
					if (response.status == 200) {
						const data = await response.json()
						console.log(data)
						setStore({ user: data });
						return true;
					}
				} catch (error) {
					console.log(error);
					return false;
				}

			},
            setUser: (user) => {
                setStore({ user });
              },
              getCurrentUser: () => {
                // Simulación de obtener usuario, puede ser desde un API o localStorage
                return getStore().user;
              },
        }
    };
};
export default getState;