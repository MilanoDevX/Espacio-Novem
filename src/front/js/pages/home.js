import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Header } from "../component/header";
import { Cards } from "../component/cards";


export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<>
		<Header/>
		<Cards/>
		
		</>
	);
};
