import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import AdminPage from "./pages/admin/AdminPage";
import Loaidat from "./pages/admin/Loaidat";
import QuanLyBatdongsan from "./pages/admin/QuanLyBatdongsan";
import MainLayout from "./layout/MainLayout";
<<<<<<< HEAD
import ChiTietSanPham from "./pages/user/ChiTietSanPham";
import Trangchu from "./pages/user/Trangchu";
=======
import Batdongsan from "./pages/user/Batdongsan";
import ChiTietSanPham from "./pages/user/Chitietsanpham";
>>>>>>> 1ae4b661fc69dfc2065ab08568203effe7a39faf

function App() {
  const [showForm, setShowForm] = useState(null);
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");
  const isProductDetailPage = location.pathname.startsWith("/product/"); // ✅ Thêm kiểm tra đúng

  // Kiểm tra nếu đường dẫn là `/bat-dong-san` hoặc `/bat-dong-san/:id`
  const isBatDongSanPage = location.pathname.startsWith("/bat-dong-san");

  return (
    <div className="App">
<<<<<<< HEAD
      {/* Chỉ hiển thị MainLayout nếu không phải trang admin và không phải trang chi tiết sản phẩm */}
      {!isAdminPage && !isProductDetailPage && (
        <MainLayout onFormChange={setShowForm} showForm={showForm} resetForm={() => setShowForm(null)} />
      )}

=======
      {!isAdminPage && !isBatDongSanPage && (
        <MainLayout onFormChange={setShowForm} showForm={showForm} resetForm={() => setShowForm(null)} />
      )}
>>>>>>> 1ae4b661fc69dfc2065ab08568203effe7a39faf
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/loaidat" element={<Loaidat />} />
<<<<<<< HEAD
        <Route path="/admin/batdongsan" element={<Batdongsan />} />

        {/* User Routes */}
        <Route path="/" element={<Trangchu />} />
        <Route path="/product/:id" element={<ChiTietSanPham />} />
=======
        <Route path="/admin/batdongsan" element={<QuanLyBatdongsan />} />
        <Route path="/bat-dong-san" element={<Batdongsan />} />
        <Route path="/bat-dong-san/:id" element={<ChiTietSanPham />} />
>>>>>>> 1ae4b661fc69dfc2065ab08568203effe7a39faf
      </Routes>
    </div>
  );
}

export default App;
