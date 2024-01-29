import React from "react";
import ReactDOM from "react-dom/client";
import { Route, Routes, Navigate } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import Sidebar from "components/Sidebar/Sidebar";
import Annonce from "views/annnonce/Annonce";
import Index from "views/Index";
import routes from "routes";
import Icons from "views/examples/Icons";
import Categorie from "views/crud/Categorie";
import Modele from "views/crud/Modele";
import Marque from "views/crud/Marque";
import Type from "views/crud/Type";
import Devise from "views/crud/Devise";
import Commission from "views/crud/Commission";

function App(){
    return(
        <>
           <Routes>
            <Route path="/admin/statistiques" element={
                <>
                    <Sidebar 
                    routes={routes}
                    />
                    <Index />
                </>
            } 
            />
           <Route path="/admin/annonces" element={
                <>
                    <Sidebar 
                    routes={routes}
                    />
                    <Annonce />
                </>
            } 
            />
            <Route path="/admin/categorie" element={
                <>
                    <Sidebar 
                    routes={routes}
                    />
                    <Categorie />
                </>
            } 
            />
            <Route path="/admin/modele" element={
                <>
                    <Sidebar 
                    routes={routes}
                    />
                    <Modele />
                </>
            } 
            />
            <Route path="/admin/marque" element={
                <>
                    <Sidebar 
                    routes={routes}
                    />
                    <Marque />
                </>
            } 
            />
            <Route path="/admin/type" element={
                <>
                    <Sidebar 
                    routes={routes}
                    />
                    <Type />
                </>
            } 
            />
            <Route path="/admin/devise" element={
                <>
                    <Sidebar 
                    routes={routes}
                    />
                    <Devise />
                </>
            } 
            />
            <Route path="/admin/commission" element={
                <>
                    <Sidebar 
                    routes={routes}
                    />
                    <Commission />
                </>
            } 
            />
            <Route path="/auth/*" element={<AuthLayout />} />
            <Route path="*" element={<Navigate to="/admin/index" replace />} />
            </Routes>
        </>
    )
}


export default App;
