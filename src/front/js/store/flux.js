const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            token: null,
			message: null,
			user: null,
			auth: false,
        },
        actions: {
            login: async (email, password) => {
                try {
                    const resp = await fetch(process.env.BACKEND_URL + "/login", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ email, password }) 
                    });
            
                    const data = await resp.json();
                    console.log("Respuesta del servidor:", data);
            
                    if (resp.ok) {
                        setStore({ user: data.user, token: data.access_token, auth: true });
                        localStorage.setItem("access_token", data.access_token);
                        return { status: true, rol: data.user.is_admin };
                    }
            
                    setStore({ auth: false });
                    return { status: false };
                } catch (error) {
                    console.log("Error en la solicitud:", error);
                    setStore({ user: false });
                    return { status: false };
                }
            },
            
             logout: () => {
				localStorage.removeItem("access_token");
				setStore({ user: null, token: null, auth: false });
				console.log("Sesión cerrada");
			},
            signup: async (user) => {
				try {
					
					const resp = await fetch(process.env.BACKEND_URL + "/signup", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(user)

					})
					console.log(resp.status)
					if (resp.status == 201) {

						return true;
					} else {
						return false
					}
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
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
			recuperarPassword: async (email,nueva,aleatoria) => {
				console.log(email,nueva,aleatoria)
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

        },
    };
};

export default getState;
