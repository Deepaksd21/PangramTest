const User = require("../models/user");
const Department = require("../models/department");
const HTTPResponse = require("../response/HTTPResponse");
const { serverErrorResponse } = require("../helpers/helpers");

/**
 * * ● Make a query that retrieves an employee/s who are in IT department and location
 * * ● Make a query that retrieves name is starting from A (location may be aurangabad, ahmedabad, etc).
 */

exports.employeeITAndLocationA = async (req, res) => {
  try {
    const employeesList = await User.find({
      userType: "Employee",
      category: "IT",
      location: { $regex: /^A/ },
    });

    return HTTPResponse.apiResponse(
      res,
      HTTPResponse.HTTP_OK,
      "All the employees list of IT department whose location is starting with A",
      employeesList
    );
  } catch (error) {
    serverErrorResponse(res, error);
  }
};

/**
 * * ● Make a query that retrieves an employee/s who are in Sales department and
 * *   descending order of employees name.
 */

exports.employeeSalesAndNameDesc = async (req, res) => {
  try {
    const employeesList = await User.find({
      userType: "Employee",
      category: "Sales",
    }).sort({ firstName: -1 });

    return HTTPResponse.apiResponse(
      res,
      HTTPResponse.HTTP_OK,
      "All the employees list in Sales with name in descending order",
      employeesList
    );
  } catch (error) {
    serverErrorResponse(res, error);
  }
};

/**
 * ! To get all departments
 * @param {*} req
 * @param {*} res
 * @returns
 */

exports.getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find();

    return HTTPResponse.apiResponse(
      res,
      HTTPResponse.HTTP_OK,
      "All the departments list",
      departments
    );
  } catch (error) {
    serverErrorResponse(res, error);
  }
};

/**
 * ! To add a new department
 * @param {*} req
 * @param {*} res
 * @returns
 */

exports.addNewDepartment = async (req, res) => {
  try {
    const { name } = req.body;

    const department = await Department.findOne({ name });
    if (department)
      return HTTPResponse.apiResponse(
        res,
        HTTPResponse.HTTP_CONFLICT,
        "Department already exists"
      );

    const newDepartment = await Department.create({ name });

    if (newDepartment) {
      return HTTPResponse.apiResponse(
        res,
        HTTPResponse.HTTP_CREATED,
        "New department added"
      );
    } else {
      return HTTPResponse.apiResponse(
        res,
        HTTPResponse.HTTP_BAD_REQUEST,
        "Department not added"
      );
    }
  } catch (error) {
    serverErrorResponse(res, error);
  }
};

/**
 * ! To update a department
 * @param {*} req
 * @param {*} res
 * @returns
 */

exports.editDepartment = async (req, res) => {
  try {
    const { departmentId, name } = req.body;

    const department = await Department.findOne({ _id: departmentId });
    if (!department)
      return HTTPResponse.apiResponse(
        res,
        HTTPResponse.HTTP_NOT_FOUND,
        "Department not found"
      );

    department.name = name ? name : department.name;

    await department.save();

    return HTTPResponse.apiResponse(
      res,
      HTTPResponse.HTTP_OK,
      "Department updated successfully"
    );
  } catch (error) {
    serverErrorResponse(res, error);
  }
};

/**
 * ! To delete a department
 * @param {*} req
 * @param {*} res
 * @returns
 */

exports.deleteDepartment = async (req, res) => {
  try {
    const { departmentId } = req.query;

    const department = await Department.deleteOne({
      _id: departmentId,
    });

    if (department.deletedCount) {
      return HTTPResponse.apiResponse(
        res,
        HTTPResponse.HTTP_OK,
        "Department deleted successfully"
      );
    } else {
      return HTTPResponse.apiResponse(
        res,
        HTTPResponse.HTTP_BAD_REQUEST,
        "Department not deleted"
      );
    }
  } catch (error) {
    serverErrorResponse(res, error);
  }
};
