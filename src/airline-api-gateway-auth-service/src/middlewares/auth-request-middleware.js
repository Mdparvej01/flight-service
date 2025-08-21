const { StatusCodes } = require("http-status-codes");

const { ErrorResponse } = require("../utils/common");

const AppError = require("../utils/errors/app-error");

const { ServerConfig } = require("../config");

const { UserService } = require("../services");

const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");
dotenv.config();

function validateAuthRequest(req, res, next) {
  if (!req.body.email) {
    ErrorResponse.message = "Something went wrong while creating city";
    ErrorResponse.error = new AppError([
      "Email name not found in the incoming request in the correct form",
    ]);

    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.body.password) {
    ErrorResponse.message = "Something went wrong while creating city";
    ErrorResponse.error = new AppError([
      "password  not found in the incoming request in the correct form",
    ]);

    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}

async function checkAuth(req, res, next) {
  const tkn = req.headers["x-access-token"];

  try {
    const response = await UserService.isAuthenticated(tkn);

    if (response) {
      req.user = response;
      next();
    }
  } catch (error) {
    return res.status(403).json({
      success: false,
      msg: "error in authentication ",
    });
  }
}

async function isAdmin(req, res, next) {
  const tkn = req.headers["x-access-token"];

  const key = ServerConfig.JWT_SECRET;

  const decodedPayload = jwt.verify(tkn, key);

  const response = await UserService.isAdmin(decodedPayload.id);

  if (!response) {
    return res
      .status(StatusCodes.ACCEPTED)
      .json({ msg: "User not authorize for tgis action" });
  }
  next();
}

module.exports = {
  validateAuthRequest,
  checkAuth,
  isAdmin,
};
