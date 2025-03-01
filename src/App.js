import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useChat } from "./context/ChatContext"; // Import useChat từ context

import AdminLayout from "./layout/AdminLayout"; // Layout riêng cho Admin
import MainLayout from "./layout/MainLayout"; // Layout cho User

import AdminPage from "./pages/admin/AdminPage";
import Loaidat from "./pages/admin/Loaidat";
import QuanLyBatdongsan from "./pages/admin/QuanLyBatdongsan";

import Batdongsan from "./pages/user/Batdongsan";
import ChiTietSanPham from "./pages/user/Chitietsanpham";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TinTuc from "./pages/user/Tintuc";
import GioiThieu from "./pages/user/GioiThieu";

function App() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");
  const { isChatOpen, setIsChatOpen } = useChat(); // Lấy trạng thái chat từ context

  return (
    <div className="App">
      {!isAdminPage && <Header />}

      <Routes>
        <Route path="/admin/*" element={<AdminLayout />} />
        <Route path="/*" element={<MainLayout onChatToggle={() => setIsChatOpen(true)} />} />
        <Route path="/dang-nhap" element={<LoginForm />} />
        <Route path="/dang-ky" element={<RegisterForm />} />
        <Route path="/tin-tuc" element={<TinTuc />} />
        <Route path="/gioi-thieu" element={<GioiThieu />} />
      </Routes>

      {!isAdminPage && <Footer />}
      {!isAdminPage && <ChatWidget isOpen={isChatOpen} onToggle={() => setIsChatOpen(!isChatOpen)} />}
    </div>
  );
}

export default App;
