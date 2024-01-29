import React from "react";
import ReactDOM from "react-dom/client";
import { Route, Routes, Navigate } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import Annonce from "views/annnonce/Annonce";
function App(){
    return(
        <>
            <Routes>
            <Route path="/test" element={<Annonce />} />
            <Route path="/auth/*" element={<AuthLayout />} />
            <Route path="*" element={<Navigate to="/admin/index" replace />} />
            </Routes>
        </>
    )
}


export default App;
