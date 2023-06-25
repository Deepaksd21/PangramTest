require("dotenv").config();
const jwt = require("jsonwebtoken");

const HTTPResponse = require("../response/HTTPResponse");

/**
 * ! Send error response
 * @param {*} res
 * @param {*} error
 * @returns
 */

exports.serverErrorResponse = (res, error) => {
  console.log("Err", error);
  return HTTPResponse.apiResponse(
    res,
    HTTPResponse.HTTP_INTERNAL_SERVER_ERROR,
    "Server Error",
    error
  );
};

/**
 * ! Generate access token
 * @param {*} data
 * @returns
 */

exports.generateToken = (data) => {
  const payload = {
    id: data._id,
    email: data.email,
    userType: data.userType,
  };

  const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "30d" });
  return token;
};

/**
 * ! Save comma separated user's hobbies in array
 * @param {*} userHobbies
 * @returns
 */

exports.saveHobbies = (userHobbies) => {
  const values = userHobbies.trim().split(",");

  return values.map((value) => value.trim());
};
