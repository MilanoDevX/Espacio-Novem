const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			user: null
		},
		actions: {

			signup: async (user) => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/signup", {
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
		}
	};
};

export default getState;
