// login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // เพิ่มบรรทัดนี้
import "./login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // เพิ่มบรรทัดนี้

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle login logic here
    // ถ้า login สำเร็จ ให้เปลี่ยนหน้า
    navigate("/menu");
  };

  return (
    <div className="login-container">
      {/* วงกลม background หลายชั้น */}
      <div className="bg-circle bg-circle1"></div>
      <div className="bg-circle bg-circle2"></div>
      <div className="bg-circle bg-circle3"></div>
      <div className="bg-circle bg-circle4"></div>
      <div className="bg-circle bg-circle5"></div>

      <div className="welcome-circle">
        <h1 className="welcome-title">WELCOME</h1>
        <h2 className="welcome-subtitle">PPC management system</h2>
        <p className="welcome-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
        </p>
      </div>
      
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="sign-in-title">Sign in</h2>
        <label className="login-label">Username</label>
        <input
          type="text"
          className="login-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label className="login-label">Password</label>
        <input
          type="password" 
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

export default Login;