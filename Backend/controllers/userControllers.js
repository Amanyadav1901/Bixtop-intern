const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Query = require("../models/queryModel");
const generateToken = require("../config/generateToken");

//@description     Register new user
//@route           POST /api/user/
//@access          Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all the Fields");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

//@description     Auth the user
//@route           POST /api/users/login
//@access          Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

//@description     get User Details
//@route           GET /api/user/getUserDetails
//@access          Public
const userDetails = asyncHandler(async (req, res) => {
  try {
    const allUser = await User.find({});

    res.json({ data: allUser });
  } catch (error) {
    console.log(error);
  }
});

module.exports = { registerUser, authUser, userDetails };

//@description     get query Details
//@route           GET /api/user/getQueryDetails
//@access          Public

const queryDetails = asyncHandler(async (req, res) => {
  try {
    const allQuery = await Query.find({});

    res.json({ data: allQuery });
  } catch (error) {
    console.log(error);
  }
});

//@description     Delete User
//@route           POST /api/user/DeleteUser
//@access          Public

const deleteUser = asyncHandler(async (req, res) => {
  try {
    const { id, name } = req.body;
    // console.log(req.body);
    const result = await User.findByIdAndDelete({ _id: id });
    console.log(result);
    res.status(201).send("user deleted successfully");
  } catch (error) {
    res.status(400);
    throw new Error("User not found");
  }
});

//@description     Register new Query
//@route           POST /api/user/query
//@access          Public
const Userquery = asyncHandler(async (req, res) => {
  const { name, email, query } = req.body;

  if (!name || !email || !query) {
    res.status(400);
    throw new Error("Please Enter all the Fields");
  }

  const q = await Query.create({
    name,
    email,
    query,
  });

  if (q) {
    res.status(201).json({
      _id: q._id,
      name: q.name,
      email: q.email,
      query: q.query,
      token: generateToken(q._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

//@description     Updates Query
//@route           POST /api/user/updateQuery
//@access          Public

const updateQuery = asyncHandler(async (req, res) => {
  try {
    const { id, name } = req.body;
    // console.log(req.body);
    const result = await Query.findByIdAndUpdate(
      { _id: id },
      {
        isResolved: "true",
      }
    );
    console.log(result);
    res.status(201).send("Marked as Resolved");
  } catch (error) {
    res.status(400);
    throw new Error("User not found");
  }
});

module.exports = {
  registerUser,
  authUser,
  userDetails,
  queryDetails,
  deleteUser,
  Userquery,
  updateQuery,
};
