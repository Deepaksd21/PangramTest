import axios from "axios";
import React, { useState, useEffect } from "react";
import baseURL from "../../utils/config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./DepartmentCard.scss";
import { notifySuccess, notifyError } from "../../utils/toast";
import AddNewDepartment from "../../components/AddNewModal/AddNewModal";

function DepartmentCard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [allDepartments, setAllDepartments] = useState([]);

  const getAllDepartments = () => {
    axios
      .get(baseURL + `/all-departments`)
      .then((res) => {
        setAllDepartments(res.data.data);
      })
      .catch((error) => notifyError(error.response.data.message));
  };

  useEffect(() => {
    getAllDepartments();
  }, []);

  const handleAddNewClick = () => {
    setModalOpen(!modalOpen);
  };

  const handleDeleteClick = () => {
    const id = allDepartments[allDepartments.length - 1]._id;

    axios
      .delete(baseURL + `/delete-department?departmentId=${id}`)
      .then((res) => {
        getAllDepartments();
      })
      .catch((error) => notifyError(error.response.data.message));
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <div className="department-card">
      <div className="department-card-buttons">
        <button
          className="department-card-button department-card-button--green"
          onClick={handleAddNewClick}
        >
          <FontAwesomeIcon
            icon={faPlus}
            className="department-card-icon department-card-icon--large"
          />
        </button>
        <button
          className="department-card-button department-card-button--red"
          onClick={handleDeleteClick}
        >
          <FontAwesomeIcon
            icon={faTrash}
            className="department-card-icon department-card-icon--large"
          />
        </button>
      </div>
      <h2 className="department-card-topic">All Departments</h2>
      <ol className="department-card-list">
        {/* Static list */}
        <li key="1">employeeId</li>
        <li key="2">departmentNames</li>
        {allDepartments &&
          allDepartments?.map((department, index) => {
            return (
              <>
                <li key={department._id}>{department.name}</li>
              </>
            );
          })}
      </ol>
      {modalOpen && (
        <AddNewDepartment
          modalOpen={modalOpen}
          handleModalClose={handleModalClose}
          getAllDepartments={getAllDepartments}
        />
      )}
    </div>
  );
}

export default DepartmentCard;
