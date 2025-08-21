const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");
dotenv.config();

const { ServerConfig } = require("../../config");

function checkPassword(plainPassword, encryptedPassword) {
  try {
    return bcrypt.compareSync(plainPassword, encryptedPassword);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

function createToken(input) {
  try {
    return jwt.sign(input, ServerConfig.JWT_SECRET, { expiresIn: "1h" });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

function verifyToken(input) {
  try {
    const decodedPayload = jwt.verify(input, ServerConfig.JWT_SECRET);

    return decodedPayload;
  } catch (error) {
    console.log("error=> ", error);
    throw error;
  }
}

module.exports = {
  checkPassword,
  createToken,
  verifyToken,
};
