const jwt = require("jsonwebtoken");
const jwt_sec = "amanyadav";

const generateToken = (id) => {
  return jwt.sign({ id }, jwt_sec, {
    expiresIn: "30d",
  });
};

module.exports = generateToken;
