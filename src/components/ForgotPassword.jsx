import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginImage from "../assets/login.png";

function ForgotPassword() {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateInput = () => {
    if (!emailOrPhone) {
      setMessage("Vui lòng nhập email hoặc số điện thoại.");
      return false;
    }
    // Kiểm tra định dạng cơ bản (có thể cải thiện thêm)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10,11}$/;
    if (!emailRegex.test(emailOrPhone) && !phoneRegex.test(emailOrPhone)) {
      setMessage("Email hoặc số điện thoại không hợp lệ.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (!validateInput()) return;

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ emailOrPhone }),
      });

      const result = await response.json();
      if (!response.ok) {
        setMessage(`Lỗi: ${result.error || "Không thể gửi yêu cầu khôi phục."}`);
      } else {
        setMessage("Liên kết khôi phục mật khẩu đã được gửi. Vui lòng kiểm tra email hoặc số điện thoại!");
        setTimeout(() => {
          navigate("/dang-nhap");
        }, 3000);
      }
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu khôi phục:", error.message);
      setMessage("⚠️ Có lỗi xảy ra, vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="row bg-white shadow rounded overflow-hidden" style={{ maxWidth: "900px" }}>
        <div className="col-md-5 d-flex flex-column justify-content-center align-items-center bg-light p-4">
          <img
            src={loginImage}
            alt="Forgot Password"
            className="mb-3"
            style={{ width: "200px" }}
          />
          <p className="text-danger text-center fw-bold">
            Nơi khởi nguồn tổ ấm, đầu tư vững bền.
          </p>
        </div>
        <div className="col-md-7 p-4">
          <h2 className="text-start fs-6 fw-bold">Khôi phục mật khẩu</h2>
          <h4 className="text-start fw-bold mb-4 fs-4">Nhập thông tin để khôi phục</h4>

          {message && (
            <div className={`alert ${message.includes("thành công") ? "alert-success" : "alert-danger"}`} role="alert">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-envelope"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nhập email hoặc số điện thoại"
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                />
              </div>
            </div>

            <button type="submit" className="btn btn-danger w-100 mb-3" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Đang gửi...
                </>
              ) : (
                "Gửi yêu cầu khôi phục"
              )}
            </button>
          </form>

          <p className="text-center mt-3">
            Quay lại trang đăng nhập?{" "}
            <button
              className="text-danger text-decoration-none btn btn-link"
              onClick={() => navigate("/dang-nhap")}
            >
              Đăng nhập
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;