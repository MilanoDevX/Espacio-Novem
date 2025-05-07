import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Hero } from "../component/hero";
import { Cards } from "../component/cards";
import { UserProfile } from "../component/userProfile";


export const Home = () => {
	const { store, actions } = useContext(Context);

	const isHomePage = true;
	return (
		<>
			<Hero />
			<Cards />
			<UserProfile />

		</>
	);
};
