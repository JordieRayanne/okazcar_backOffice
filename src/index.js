/*!

=========================================================
* Argon Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth"
import {AuthProvider, RequireAuth} from "react-auth-kit";

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
import Voiture from "views/crud/Voiture";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <AuthProvider authType = {'localstorage'}
                  authName={'_auth'}
                  cookieDomain={window.location.hostname}
                  cookieSecure={window.location.protocol === "https:"}>
        <BrowserRouter>
            <Routes>
                <Route exact path="/auth/*" element={<AuthLayout />}></Route>
                <Route path="/admin/*"
                       element={
                           <RequireAuth loginPath="/auth/login">
                               <AdminLayout />
                           </RequireAuth>
                       }
                ></Route>
                {/*<Route path="/auth/*" element={<AuthLayout />} />*/}
                <Route
                  path="/"
                  element={<Navigate to="/auth/login" replace />}
                />
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
            </Routes>
                <Route path="/admin/voiture" element={
                <>
                    <Sidebar 
                    routes={routes}
                    />
                    <Voiture />
                </>
            } 
            />
            </Routes>
        </BrowserRouter>
    </AuthProvider>
);
