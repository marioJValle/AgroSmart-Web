import { Routes, Route } from "react-router-dom";
import LandingPage from "./view/LandingPage";
import ViewNews from "./view/ViewNews";
import GestiondeUsuairo from "./view/GestiondeUsuaios";
import MainLayout from "./components/MainLayout";
import Login from "./view/Login";
import ProtectedRoute from "./context/ProtectedRoute";
import Unauthorized from "./view/Unauthorized";
import Layout from "./context/Layout";
import Dashboard from "./view/Dashboard";

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
                </Route>
            </Route>
        </Routes>
    );
}
