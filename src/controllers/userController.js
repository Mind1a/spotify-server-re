const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // if use exists
  // პიცის გამოძახება
  // 1 წამი
  const userExists = await User.findOne({ email });

  // შევჭამოთ პიცა
  if (userExists) {
    res.status(StatusCodes.BAD_REQUEST);
    throw new Error("User already exists");
  }

  // Create User

  //          2 წუთი
  // გიორგი - GLOVO - ანი
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

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Find user
  const user = await User.findOne({ email });

  // check if user exists and password matches
  //                                   mindia123
  if (user && (await user.matchPassword(password))) {
    res.status(StatusCodes.OK).json({
      _id: user._id,
      email: user.email,
      token: "myUniqueToken",
    });
  }
};

module.exports = { registerUser, loginUser };

// Giorgi - asbasdawdasdawdasdawdwadaw
// Login : Giorgi - asbasdawdasdawdasdawdwadaw

//                  asbasdawdasdawdasdawdwadaw
