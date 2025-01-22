import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Header } from "../component/header";
import { Cards } from "../component/cards";
import { UserProfile } from "../component/userProfile";


export const Home = () => {
	const { store, actions } = useContext(Context);
	

	return (
		<>
		<Header/>
		<Cards/>
		<UserProfile/>
		
		</>
	);
};
