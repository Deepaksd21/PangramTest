import axios from "axios";
import React, { useState } from "react";
import baseURL from "../../utils/config";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { notifySuccess, notifyError } from "../../utils/toast";
import { validateLoginForm } from "../../validations/CustomValidation";
import "./Login.scss";

const Login = () => {
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = { email, password };

    const validationErrors = validateLoginForm(payload);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      axios
        .post(baseURL + `/login`, payload)
        .then(async (res) => {
          if (res.data.data.userType === "Employee") {
            await navigate("/");
            localStorage.setItem("EmployeeToken", res.data.data.accessToken);
          }
          if (res.data.data.userType === "Manager") {
            await navigate("/manager");
            localStorage.setItem("ManagerToken", res.data.data.accessToken);
          }
          notifySuccess("User logged in successfully");
        })
        .catch((error) => {
          notifyError(error.response.data.message);
        });
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Please sign in to your account</h2>
        <div className="form-group">
          <label className="label-container">
            Email:
            {errors.email && (
              <div className="error-message">{errors.email}</div>
            )}
          </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="label-container">
            Password:
            {errors.password && (
              <div className="error-message">{errors.password}</div>
            )}
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Sign in</button>
        <a href="/register">
          <h3>Register a new account</h3>
        </a>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
