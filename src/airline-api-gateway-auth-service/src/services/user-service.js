const { StatusCodes } = require("http-status-codes");
const { UserRepository, RoleRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");
const bcrypt = require("bcrypt");
const userRepo = new UserRepository();
const roleRepo = new RoleRepository();
const { Auth, Enums } = require("../utils/common");

async function create(data) {
  try {
    const user = await userRepo.create(data);
    const role = await roleRepo.getRoleByName(Enums.USER_ROLES.CUSTOMER);
    user.addRole(role);
    return user;
  } catch (error) {
    console.log("Something went wrong in the service layer", error);

    throw error;
  }
}

async function signin(data) {
  try {
    const user = await userRepo.getUserByEmail(data.email);

    if (!user) {
      throw new AppError(
        "No user found with given email",
        StatusCodes.NOT_FOUND
      );
    }

    const passwordMatched = Auth.checkPassword(data.password, user.password);

    if (!passwordMatched) {
      throw new AppError(
        "Entered password is wrong",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }

    const jwt = Auth.createToken({ id: user.id, email: user.email });
    return jwt;
  } catch (error) {
    throw new AppError(error, StatusCodes.BAD_REQUEST);
  }
}

async function isAuthenticated(token) {
  try {
    if (!token) {
      throw new AppError("Missing jwt token", StatusCodes.BAD_REQUEST);
    }
    const response = Auth.verifyToken(token);

    const user = await userRepo.getUserByEmail("fhrdg6@gmail.com");

    if (!user) {
      throw new AppError("No User Found", StatusCodes.BAD_REQUEST);
    }

    return user.id;
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    if (error.name == "JsonWebTokenError") {
      throw new AppError("Invalid JWT token", StatusCodes.BAD_REQUEST);
    }

    throw new AppError(
      "Something went wrong during authentication",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function addRoleToUser(data) {
  try {
    const user = await userRepo.get(data.id);
    const role = await roleRepo.getRoleByName(data.role);
    user.addRole(role);
    return user;
  } catch (error) {
    throw new AppError(error, StatusCodes.NOT_FOUND);
  }
}

async function isAdmin(id) {
  try {
    const user = await userRepo.get(id);

    if (!user) {
      throw new AppError(
        "No user found for the given id",
        StatusCodes.NOT_FOUND
      );
    }
    const adminrole = await roleRepo.getRoleByName(Enums.USER_ROLES.ADMIN);
    if (!adminrole) {
      throw new AppError(
        "No user found for the given role",
        StatusCodes.NOT_FOUND
      );
    }
    return user.hasRole(adminrole);
  } catch (error) {
    throw new AppError(
      "Something went wrong",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  create,
  signin,
  isAuthenticated,
  addRoleToUser,
  isAdmin,
};
