const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			user: null
		},
		actions: {
			login: async (useNew) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/login", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(useNew)
					})
					console.log(resp.status)
					const data = await resp.json()
					if (resp.ok) {

						console.log(data, "token")
						setStore({ user: data.user, token: data.access_token, auth: true })

						localStorage.setItem("access_token", data.access_token)
						return {
							status: true,
							rol: data.user.is_admin
						};
					}
					setStore({ auth: false })
					return {
						status: false
					}
				} catch (error) {
					console.log("Error loading message from backend", error)
					setStore({ user: false })
					return {
						status: false
					};
				}
			}, logout: () => {
				localStorage.removeItem("access_token");
				setStore({ user: null, token: null, auth: false });
				console.log("Sesión cerrada");
			},
			signup: async (user) => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/signup", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(user)

					})

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
		}
	};
};

export default getState;
