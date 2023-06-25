const HTTPResponse = require("../response/HTTPResponse");

exports.serverErrorResponse = (res, error) => {
  console.log("This error -->", error);
  return HTTPResponse.apiResponse(
    res,
    HTTPResponse.HTTP_INTERNAL_SERVER_ERROR,
    "Server Error",
    error
  );
};
