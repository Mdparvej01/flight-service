const express = require("express");

const router = express.Router();

const { InfoController } = require("../../controllers");

const { UserController } = require("../../controllers");

const { AuthRequestMiddleware } = require("../../middlewares");

router.post(
  "/signup",
  AuthRequestMiddleware.validateAuthRequest,
  UserController.signup
);

router.post(
  "/signin",
  AuthRequestMiddleware.validateAuthRequest,
  UserController.signin
);

router.post(
  "/role",
  AuthRequestMiddleware.checkAuth,
  AuthRequestMiddleware.isAdmin,
  UserController.addRoleToUser
);

router.get("/info", AuthRequestMiddleware.checkAuth, InfoController.info);

module.exports = router;
