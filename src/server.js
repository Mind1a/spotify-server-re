const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRouter = require("./routes/userRoutes");
const connectedDB = require("./config/dbConnect.js");
const { StatusCodes } = require("http-status-codes");

//Load env variables
dotenv.config();

//Initialize app
const app = express();

app.use(express.json());

app.use("/api/users", userRouter);

// Start the server
const PORT = process.env.PORT || 5000;

// Global error

// const err = {
//   status: 400,
//   message: "Invalid user data",
// };

app.use((err, req, res, next) => {
  res
    .status(err.status || StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: err.message || "Internal Server Error" });
});

const startServer = async () => {
  await connectedDB();
  app.listen(PORT, () => console.log("Server running http://localhost:5000"));
};

startServer();
