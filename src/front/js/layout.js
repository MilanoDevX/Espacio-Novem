import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import { Reservations } from "./pages/reservations";
import injectContext from "./store/appContext";
import { Header } from "./component/header";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import {InicioSesion} from "./component/login";
import {ContactMap} from "./component/contactMap";
import { UserProfile } from "./component/userProfile";
import { Register } from "./component/register";
import { AboutUs } from "./component/aboutUs";
import { SendEmail } from "./component/send-email";
import { ResetPassword } from "./component/reset-password";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";
    
    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;
    
    const noNavbar = ["/login", "/contactMap"];
    const hideNavbar = noNavbar.includes(location.pathname); //saque el navabar del iniciosesion

    const noFooter = ["/contactMap", "/userProfile"];
    const hideFooter = noFooter.includes(location.pathname);

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                {!hideNavbar && <Navbar />}
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<AboutUs/>} path="/aboutUs" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<Reservations />} path="/reservations" />
                        <Route element={<SendEmail />} path="/send-email" />
                        <Route element={<InicioSesion />} path="/login" />
                        <Route element={<ContactMap />} path="/contactMap" />
                        <Route element={<UserProfile/>} path="/userProfile"/>
                        <Route element={<ResetPassword/>} path="/reset-password"/>
                        <Route element={<Register />} path="/register" />
                        <Route element={<Header />} path="/home" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    {!hideFooter && <Footer />}
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
