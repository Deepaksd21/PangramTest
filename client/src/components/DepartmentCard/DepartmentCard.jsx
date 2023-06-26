import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./DepartmentCard.scss";

const DepartmentCard = () => {
  return (
    <div className="department-card">
      <div className="department-card__buttons">
        <button className="department-card__button department-card__button--green">
          <FontAwesomeIcon
            icon={faPlus}
            className="department-card__icon department-card__icon--large"
          />
        </button>
        <button className="department-card__button department-card__button--yellow">
          <FontAwesomeIcon
            icon={faEdit}
            className="department-card__icon department-card__icon--large"
          />
        </button>
        <button className="department-card__button department-card__button--red">
          <FontAwesomeIcon
            icon={faTrash}
            className="department-card__icon department-card__icon--large"
          />
        </button>
      </div>
      <h2 className="department-card__topic">All Departments</h2>
      <ol className="department-card__list">
        <li key="1">employeeId</li>
        <li>departmentNames</li>
        <li>categoryNames</li>
        <li>salary</li>
        <li>location</li>
      </ol>
    </div>
  );
};

export default DepartmentCard;
