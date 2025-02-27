import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import AdminPage from "./pages/admin/AdminPage";
import Loaidat from "./pages/admin/Loaidat";
import QuanLyBatdongsan from "./pages/admin/QuanLyBatdongsan";
import MainLayout from "./layout/MainLayout";
import Batdongsan from "./pages/user/Batdongsan";
import ChiTietSanPham from "./pages/user/Chitietsanpham";

function App() {
    const location = useLocation();
    const isAdminPage = location.pathname.startsWith("/admin");
    const isBatDongSanPage = location.pathname.startsWith("/bat-dong-san");

    return (
        <div className="App">
            {!isAdminPage && !isBatDongSanPage && <MainLayout />}
            <Routes>
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/admin/loaidat" element={<Loaidat />} />
                <Route path="/admin/batdongsan" element={<QuanLyBatdongsan />} />
                <Route path="/bat-dong-san" element={<Batdongsan />} />
                <Route path="/bat-dong-san/:id" element={<ChiTietSanPham />} />
            </Routes>
        </div>
    );
}

export default App;
