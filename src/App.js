import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import AdminPage from "./pages/admin/AdminPage";
import Loaidat from "./pages/admin/Loaidat";
import Batdongsan from "./pages/admin/Batdongsan";
import MainLayout from "./layout/MainLayout";
import ChiTietSanPham from "./pages/user/ChiTietSanPham";
import Trangchu from "./pages/user/Trangchu";

function App() {
  const [showForm, setShowForm] = useState(null);
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");
  const isProductDetailPage = location.pathname.startsWith("/product/"); // ✅ Thêm kiểm tra đúng

  return (
    <div className="App">
      {/* Chỉ hiển thị MainLayout nếu không phải trang admin và không phải trang chi tiết sản phẩm */}
      {!isAdminPage && !isProductDetailPage && (
        <MainLayout onFormChange={setShowForm} showForm={showForm} resetForm={() => setShowForm(null)} />
      )}

      <Routes>
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/loaidat" element={<Loaidat />} />
        <Route path="/admin/batdongsan" element={<Batdongsan />} />

        {/* User Routes */}
        <Route path="/" element={<Trangchu />} />
        <Route path="/product/:id" element={<ChiTietSanPham />} />
      </Routes>
    </div>
  );
}

export default App;
