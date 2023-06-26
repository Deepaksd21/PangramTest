import axios from "axios";
import React, { useState, useEffect } from "react";
import baseURL from "../../utils/config";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { notifySuccess, notifyError } from "../../utils/toast";
import { validateSignupForm } from "../../validations/CustomValidation";
import "./Register.scss";

const Register = () => {
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    location: "",
    hobbies: "",
    password: "",
    confirmPassword: "",
    userType: "Employee",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevUserDetails) => ({
      ...prevUserDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateSignupForm;

    const validationErrors = validateSignupForm(userDetails);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      axios
        .post(baseURL + `/register`, userDetails)
        .then(async (res) => {
          await navigate("/login");
          notifySuccess("User registered successfully");
        })
        .catch((error) => notifyError(error.response.data.message));
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Please sign up for your account</h2>
        <div className="form-group form-group-inline">
          <div className="form-group-item">
            <label className="label-container">
              First Name:
              {errors.firstName && (
                <div className="error-message">{errors.firstName}</div>
              )}
            </label>

            <input
              type="text"
              name="firstName"
              value={userDetails.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group-item">
            <label className="label-container">
              Last Name:
              {errors.lastName && (
                <div className="error-message">{errors.lastName}</div>
              )}
            </label>

            <input
              type="text"
              name="lastName"
              value={userDetails.lastName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label className="label-container">
            Email:
            {errors.email && (
              <div className="error-message">{errors.email}</div>
            )}
          </label>
          <input
            type="text"
            name="email"
            value={userDetails.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="label-container">
            Gender:
            {errors.gender && (
              <div className="error-message">{errors.gender}</div>
            )}
          </label>
          <div className="select-container">
            <select
              name="gender"
              value={userDetails.gender}
              onChange={handleChange}
            >
              <option value="">Select your gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Prefer not to answer">Prefer not to answer</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label className="label-container">
            Hobbies:
            {errors.hobbies && (
              <div className="error-message">{errors.hobbies}</div>
            )}
          </label>
          <input
            type="text"
            name="hobbies"
            value={userDetails.hobbies}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="label-container">
            Location:
            {errors.location && (
              <div className="error-message">{errors.location}</div>
            )}
          </label>
          <input
            type="text"
            name="location"
            value={userDetails.location}
            onChange={handleChange}
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
            name="password"
            value={userDetails.password}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="label-container">
            Confirm Password:
            {errors.confirmPassword && (
              <div className="error-message">{errors.confirmPassword}</div>
            )}
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={userDetails.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="label-container">Signup as:</label>
          <div className="select-container">
            <select
              name="userType"
              value={userDetails.userType}
              onChange={handleChange}
            >
              <option value="Employee">Employee</option>
              <option value="Manager">Manager</option>
            </select>
          </div>
        </div>
        <button type="submit">Sign Up</button>
        <a href="/login">
          <h3>Already registered</h3>
        </a>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Register;
