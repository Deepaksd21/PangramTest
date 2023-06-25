import axios from "axios";
import React, { useState, useEffect } from "react";
import "./Employee.scss";
import baseURL from "../../utils/config";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { notifySuccess, notifyError } from "../../utils/toast";

const EmployeeCard = () => {
  const [employee, setEmployee] = useState({});

  useEffect(() => {
    axios
      .get(baseURL + `/profile-details`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("EmployeeToken"),
        },
      })
      .then((res) => setEmployee(res.data.data))
      .catch((error) => notifyError(error.response.data.message));
  }, []);
  return (
    <div className="card-wrapper">
      <div className="card">
        <div className="welcome">
          <h2>Hello {employee.firstName || "John"}</h2>
        </div>
        <table>
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Location</th>
              <th>Department</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {employee.firstName + " " + employee.lastName || "John Doe"}
              </td>
              <td>{employee.location || "Not Provided"}</td>
              <td>{employee.department || "Not asssigned"}</td>
              <td>{employee.category || "Not assigned"}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeCard;
