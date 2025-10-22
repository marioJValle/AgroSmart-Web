import { Routes, Route } from "react-router-dom";
import LandingPage from "./view/LandingPage";
import ViewNews from "./view/ViewNews";
import GestiondeUsuairo from "./view/GestiondeUsuaios";
import MainLayout from "./context/MainLayout";
import Login from "./view/Login";
import ProtectedRoute from "./context/ProtectedRoute";
import Unauthorized from "./view/Unauthorized";
import Layout from "./context/Layout";
import Dashboard from "./view/Dashboard";
import GestionInformacion from "./view/GestionInformacion";
import EstadisticasPage from "./view/EstadisticasPage";
import ProfilePage from "./view/ProfilePage";

export default function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route index path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/unauthorized" element={<Unauthorized />} />
            </Route>

            <Route path="/dashboard" element={<ProtectedRoute />}>
                <Route element={<MainLayout />}>
                    <Route path="" element={<Dashboard />} />
                    <Route path="news" element={<ViewNews />} />
                    <Route path="user-management" element={<GestiondeUsuairo />} />
                    <Route path="informacion-agricola" element={<GestionInformacion />} />
                    <Route path="estadisticas" element={<EstadisticasPage />} />
                    <Route path="profile" element={<ProfilePage />} />
                </Route>
            </Route>
        </Routes>
    );
}