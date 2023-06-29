const express = require("express");
const router = express.Router();

const middlewares = require("../middlewares/authToken");
const userController = require("../controllers/auth.controller");
const managerController = require("../controllers/manager.controller");
const employeeController = require("../controllers/employee.controller");

/**
 * ! Authentication routes
 */

router.post("/register", userController.registerUser);

router.post("/login", userController.loginUser);

/**
 * ! Employee routes
 */

router.get(
  "/profile-details",
  middlewares.authenticateToken,
  employeeController.getEmployeeDetails
);

/**
 * ! Manager Routes
 */

router.get(
  "/employees/it-location-a",
  managerController.employeeITAndLocationA
);

router.get(
  "/employees/sales-name-desc",
  managerController.employeeSalesAndNameDesc
);

/**
 * ! Department routes
 */

router.get("/all-departments", managerController.getAllDepartments);

router.post("/add-department", managerController.addNewDepartment);

router.put("/edit-department", managerController.editDepartment);

router.delete("/delete-department", managerController.deleteDepartment);

module.exports = router;
