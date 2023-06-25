import React, { useState } from "react";
import "./Register.scss";

const Register = () => {
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
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
    // Handle signup logic here
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h3>Please sign up for your account</h3>
        <div className="form-group form-group-inline">
          <div className="form-group-item">
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              value={userDetails.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group-item">
            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={userDetails.lastName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Gender:</label>
          <div className="select-container">
            <select
              name="gender"
              value={userDetails.gender}
              onChange={handleChange}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Prefer not to answer">Prefer not to answer</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Hobbies:</label>
          <input
            type="text"
            name="hobbies"
            value={userDetails.hobbies}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={userDetails.password}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={userDetails.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Signup as:</label>
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
      </form>
    </div>
  );
};

export default Register;
