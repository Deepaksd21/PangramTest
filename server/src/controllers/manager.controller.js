const User = require("../models/user");
const HTTPResponse = require("../response/HTTPResponse");
const { serverErrorResponse } = require("../helpers/helpers");
const e = require("express");

/**
 * * ● Make a query that retrieves an employee/s who are in IT department and location
 * *   name is starting from A (location may be aurangabad, ahmedabad, etc).
 */

exports.employeeITAndLocationA = async (req, res) => {
  try {
    const employeesList = await User.find({
      userType: "Employee",
      department: "IT",
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
 * * descending order of employees name.
 */

exports.employeeSalesAndNameDesc = async (req, res) => {
  try {
    const employeesList = await User.find({
      userType: "Employee",
      department: "Sales",
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
