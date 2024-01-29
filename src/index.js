import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import ReactDOM from "react-dom/client";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth"
import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";
import {AuthProvider, RequireAuth} from "react-auth-kit";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
<AuthProvider authType = {'localstorage'}
                  authName={'_auth'}
                  cookieDomain={window.location.hostname}
                  cookieSecure={window.location.protocol === "https:"}>
  <BrowserRouter>
    <React.StrictMode>
        <App />
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
            <Route path="*" element={<Navigate to="/admin/index" replace />} />
        </Routes>
    </React.StrictMode>
  </BrowserRouter>
    </AuthProvider>
);
