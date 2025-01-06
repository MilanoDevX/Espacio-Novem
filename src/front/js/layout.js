import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import {InicioSesion} from "./component/inicioSesion";
import {ContactMap} from "./component/contactMap";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";
    
    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;
    
    const noNavbar = ["/inicioSesion"];
    const hideNavbar = noNavbar.includes(location.pathname); //saque el navabar del iniciosesion

    const noFooter = ["/contactMap"];
    const hideFooter = noFooter.includes(location.pathname);

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                {!hideNavbar && <Navbar />}
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<InicioSesion />} path="/inicioSesion" />
                        <Route element={<ContactMap />} path="/contactMap" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    {!hideFooter && <Footer />}
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
