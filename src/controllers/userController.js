const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // if use exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(StatusCodes.BAD_REQUEST);
    throw new Error("User already exists");
  }

  // Create User
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(StatusCodes.CREATED).json({
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(StatusCodes.BAD_REQUEST);
    throw new Error("Invalid user data");
  }
});

const loginUser = async (req, res) => {};

module.exports = { registerUser, loginUser };

// Giorgi - asbasdawdasdawdasdawdwadaw
// Login : Giorgi - asbasdawdasdawdasdawdwadaw

//                  asbasdawdasdawdasdawdwadaw
