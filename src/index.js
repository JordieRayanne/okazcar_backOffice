// Import necessary libraries and components
import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ReactDOM from "react-dom";
import { AuthProvider, RequireAuth } from "react-auth-kit";

// Import your layout and view components
import AdminLayout from "layouts/Admin";
import AuthLayout from "layouts/Auth";
import Sidebar from "components/Sidebar/Sidebar";
import Annonce from "views/annnonce/Annonce";
import Index from "views/Index";
import Categorie from "views/crud/Categorie";
import Modele from "views/crud/Modele";
import Marque from "views/crud/Marque";
import Type from "views/crud/Type";
import Devise from "views/crud/Devise";
import Commission from "views/crud/Commission";
import Login from "views/examples/Login";

// Placeholder components (replace with your actual components)
const login = () => <div><Login /></div>;
const NotFound = () => <div>404 Not Found</div>;

// AuthenticatedRoute component to protect routes
const AuthenticatedRoute = ({ children }) => (
  <RequireAuth loginPath="/auth/login">{children}</RequireAuth>
);

// Main application rendering
ReactDOM.render(
  <AuthProvider
    authType="localstorage"
    authName="_auth"
    cookieDomain={window.location.hostname}
    cookieSecure={window.location.protocol === "https:"}
  >
    <BrowserRouter>
      <Routes>
        <Route path="/auth/*" element={<AuthLayout />} />
        <Route
          path="/admin/*"
          element={
            <AuthenticatedRoute>
              <AdminLayout>
                <Routes>
                  <Route
                    path="/"
                    element={
                      <>
                        <Sidebar />
                        <Index />
                      </>
                    }
                  />
                  <Route path="/annonces" element={<Annonce />} />
                  <Route path="/categorie" element={<Categorie />} />
                  <Route path="/modele" element={<Modele />} />
                  <Route path="/marque" element={<Marque />} />
                  <Route path="/type" element={<Type />} />
                  <Route path="/devise" element={<Devise />} />
                  <Route path="/commission" element={<Commission />} />
                  <Route path="*" element={<Navigate to="/admin" />} />
                </Routes>
              </AdminLayout>
            </AuthenticatedRoute>
          }
        />
        <Route path="/auth/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/auth/login" />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>,
  document.getElementById("root")
);
