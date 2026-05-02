import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Home } from "./pages/Home";
import { WizardPage } from "./pages/WizardPage";

function AppRoutes() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("mech_is_authenticated") === "true";
  });
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("mech_is_authenticated", isAuthenticated ? "true" : "false");
  }, [isAuthenticated]);

  const handleLogin = () => {
    setIsAuthenticated(true);
    navigate("/home", { replace: true });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate("/login", { replace: true });
  };

  const handleStart = () => {
    navigate("/wizard");
  };

  return (
    <Routes>
      <Route path="/" element={<Navigate to={isAuthenticated ? "/home" : "/login"} replace />} />
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/home"
        element={
          isAuthenticated ? (
            <Home onStart={handleStart} onLogout={handleLogout} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/wizard"
        element={
          isAuthenticated ? <WizardPage /> : <Navigate to="/login" replace />
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
