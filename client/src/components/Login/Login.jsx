import axios from "axios";
import React, { useState } from "react";
import baseURL from "../../utils/config";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { notifySuccess, notifyError } from "../../utils/toast";
import "./Login.scss";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = { email, password };

    axios
      .post(baseURL + `/login`, payload)
      .then(async (res) => {
        await navigate("/employee");
        localStorage.setItem("EmployeeToken", res.data.data.accessToken);
        notifySuccess("User logged in successfully");
      })
      .catch((error) => {
        notifyError(error.response.data.message);
      });
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Please sign in to your account</h2>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Sign in</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
