import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import { Reservations } from "./pages/reservations";
import { Agenda } from "./pages/agenda";
import injectContext from "./store/appContext";
import { Header } from "./component/header";
import { Navbar } from "./component/navbar";
import { UserProfile } from "./component/userProfile";
import { Register } from "./component/register";
import { AboutUs } from "./component/aboutUs";
import { SendEmail } from "./component/send-email";
import { ResetPassword } from "./component/reset-password";
import { Admin } from "./component/admin";
import { Footer } from "./component/footer";
import { FooterLogin } from "./component/footerLogin";
import { Benefits } from "./component/benefits";


import ProtectedRoute from "./component/protectedRoute.js";


// Componente que decide si renderizar Footer o FooterLogin y sacar eel admin
const FooterComponent = () => {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith("/admin");
    const isRegister = location.pathname.startsWith("/register");
    const isSendEmail = location.pathname.startsWith("/send-email");
    const isResetPass = location.pathname.startsWith("/reset-password");
    const isAgendaRoute = location.pathname.startsWith("/agenda"); 

    if (isAdminRoute || isRegister || isSendEmail || isResetPass || isAgendaRoute) {
        return null; 
    }

    return location.pathname === "/" ? <Footer /> : <FooterLogin />;
};

const Layout = () => {
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL === "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<AboutUs />} path="/aboutUs" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<ProtectedRoute><Reservations /></ProtectedRoute>} path="/reservations" />
                        <Route element={<ProtectedRoute><Agenda /></ProtectedRoute>} path="/agenda" />
                        <Route element={<SendEmail />} path="/send-email" />
                        <Route element={<ProtectedRoute><UserProfile /></ProtectedRoute>} path="/userProfile" />
                        <Route element={<ResetPassword />} path="/reset-password" />
                        <Route element={<ProtectedRoute><Admin /></ProtectedRoute>} path="/admin" />
                        <Route element={<Register />} path="/register" />
                        <Route element={<Benefits />} path="/benefits" />
                        <Route element={<Header />} path="/home" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <FooterComponent /> {/* Aquí renderizamos el Footer o FooterLogin según la ruta */}
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);



