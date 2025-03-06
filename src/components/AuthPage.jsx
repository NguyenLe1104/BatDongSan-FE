import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

function AuthPage() {
  const [activeForm, setActiveForm] = useState("login"); // Mặc định là login

  const toggleForm = (formType) => {
    setActiveForm(formType); // Chuyển đổi giữa "login" và "register"
  };

  return (
    <div>
      {activeForm === "login" ? (
        <LoginForm toggleForm={toggleForm} />
      ) : (
        <RegisterForm toggleForm={toggleForm} />
      )}
    </div>
  );
}

export default AuthPage;