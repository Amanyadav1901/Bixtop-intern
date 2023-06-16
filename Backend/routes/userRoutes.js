const express = require("express");
const {
  registerUser,
  authUser,
  userDetails,
  queryDetails,
  deleteUser,
  Userquery,
  updateQuery,
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(registerUser);
router.route("/login").post(authUser);
router.route("/getUserDetails").get(userDetails);
router.route("/getQueryDetails").get(queryDetails);
router.route("/DeleteUser").post(deleteUser);
router.route("/query").post(Userquery);
router.route("/updateQuery").post(updateQuery);

module.exports = router;
