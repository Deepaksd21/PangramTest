require("dotenv").config();
const jwt = require("jsonwebtoken");
const HttpResponse = require("../response/HTTPResponse");

module.exports = middlewares = {
  authenticateToken: async (req, res, next) => {
    try {
      if (
        !req.headers["authorization"] ||
        !req.headers["authorization"] === ""
      ) {
        return HttpResponse.apiResponse(
          res,
          HttpResponse.HTTP_UNAUTHORIZED,
          "Please provide an access token"
        );
      }

      const authHeader = req.headers.authorization;
      if (authHeader) {
        const token = authHeader.split(" ")[1];
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        console.log({ verifyToken });
        req.user = verifyToken;
        next();
      } else {
        return HttpResponse.apiResponse(
          res,
          HttpResponse.HTTP_UNAUTHORIZED,
          "Unauthorized or Invalid token."
        );
      }
    } catch (error) {
      return HttpResponse.apiResponse(
        res,
        HttpResponse.HTTP_INTERNAL_SERVER_ERROR,
        error.name
      );
    }
  },
};
