const User = require("../models/user");
const HTTPResponse = require("../response/HTTPResponse");
const { serverErrorResponse } = require("../helpers/helpers");

/**
 * ! To get employee details
 * @param {*} req
 * @param {*} res
 * @returns
 */

exports.getEmployeeDetails = async (req, res) => {
  try {
    const employee = await User.findOne({ _id: req.user.id });
    if (!employee)
      return HTTPResponse.apiResponse(
        res,
        HTTPResponse.HTTP_NOT_FOUND,
        "Employee not found"
      );

    return HTTPResponse.apiResponse(
      res,
      HTTPResponse.HTTP_OK,
      "Employee details",
      employee
    );
  } catch (error) {
    serverErrorResponse(res, error);
  }
};
