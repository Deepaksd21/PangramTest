const bcrypt = require("bcrypt");
const User = require("../models/user");
const HTTPResponse = require("../response/HTTPResponse");
const {
  saveHobbies,
  generateToken,
  serverErrorResponse,
} = require("../helpers/helpers");
const {
  signupValidation,
  loginValidation,
} = require("../validations/user.validation");

/**
 * ! For user registeration as a Employee or Manager
 * @param {*} req
 * @param {*} res
 * @returns
 */

exports.registerUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      gender,
      hobbies,
      location,
      userType,
      password,
    } = req.body;

    /**
     * ! Signup Validation
     */
    const { error } = signupValidation.validate(req.body);

    if (error)
      return HTTPResponse.apiResponse(
        res,
        HTTPResponse.HTTP_BAD_REQUEST,
        error.details[0].message
      );

    /**
     * ! Check if user exists
     */
    const checkUserEmail = await User.findOne({ email });
    if (checkUserEmail)
      return HTTPResponse.apiResponse(
        res,
        HTTPResponse.HTTP_CONFLICT,
        "Email is already registered. Please use different email"
      );

    /**
     * ! Create hash of the password
     */
    const hashedPassword = bcrypt.hashSync(password, 10);

    /**
     * ! Create a user
     */
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      gender,
      location,
      hobbies: saveHobbies(hobbies),
      userType,
    });

    if (newUser) {
      return HTTPResponse.apiResponse(
        res,
        HTTPResponse.HTTP_CREATED,
        "User registered successfully"
      );
    } else {
      return HTTPResponse.apiResponse(
        res,
        HTTPResponse.HTTP_BAD_REQUEST,
        "User registeration failed"
      );
    }
  } catch (error) {
    serverErrorResponse(res, error);
  }
};

/**
 * ! For user login
 */

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    /**
     * ! Login validation
     */
    const { error } = loginValidation.validate(req.body);

    if (error)
      return HTTPResponse.apiResponse(
        res,
        HTTPResponse.HTTP_BAD_REQUEST,
        error.details[0].message
      );

    /**
     * ! Check if user with the given email exists or not
     */
    const user = await User.findOne({ email });
    if (!user)
      return HTTPResponse.apiResponse(
        res,
        HTTPResponse.HTTP_NOT_FOUND,
        "User not found"
      );

    const checkValidPassword = bcrypt.compareSync(password, user.password);

    if (!checkValidPassword)
      return HTTPResponse.apiResponse(
        res,
        HTTPResponse.HTTP_UNAUTHORIZED,
        "Invalid Password. Please try again"
      );

    const accessToken = generateToken(user);

    return HTTPResponse.apiResponse(
      res,
      HTTPResponse.HTTP_OK,
      "Logged in successfully",
      { userType: user?.userType, accessToken }
    );
  } catch (error) {
    serverErrorResponse(res, error);
  }
};
