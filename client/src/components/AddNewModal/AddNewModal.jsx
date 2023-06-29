import axios from "axios";
import React, { useState } from "react";
import baseURL from "../../utils/config";
import { ToastContainer } from "react-toastify";
import { notifySuccess, notifyError } from "../../utils/toast";

function AddNewDepartment({ handleModalClose, getAllDepartments }) {
  const [name, setName] = useState("");

  const handleInputChange = (e) => {
    setName(e.target.value);
  };

  const handleAddClick = () => {
    axios
      .post(baseURL + `/add-department`, { name })
      .then((res) => {
        getAllDepartments();
        notifySuccess("New Department Added");
      })
      .catch((error) => notifyError(error.response.data.message));

    setName("");
    handleModalClose(false);
  };

  return (
    <>
      <div className="modal-overlay">
        <div className="modal-card">
          <div className="modal-content">
            <h2>Add New Item</h2>
            <input
              type="text"
              value={name}
              onChange={handleInputChange}
              placeholder="Add new department"
            />
          </div>
          <div
            className="modal-buttons"
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              marginTop: "20px",
            }}
          >
            <button className="modal-button" onClick={handleAddClick}>
              Add
            </button>
            <button className="modal-button" onClick={handleModalClose}>
              Close
            </button>
            <ToastContainer />
          </div>
        </div>
      </div>
    </>
  );
}

export default AddNewDepartment;
