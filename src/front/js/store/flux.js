
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			message: null,
			user: null,
			auth: false,
		},
		actions: {
			
			login: async (useNew) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "api/login", {
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
					const resp = await fetch(process.env.BACKEND_URL + "/api/signup", {
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

			logout: () => {

				localStorage.removeItem("access_token");
				setStore({ user: null, token: null, auth: false });
				console.log("Sesión cerrada");
			},

			getProfile: async () => {
				try {
					const token = localStorage.getItem("access_token");
					if(!token){
						return false
					}
					const response = await fetch(process.env.BACKEND_URL + "api/user/profile", {
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

		}
	};
};

export default getState;
