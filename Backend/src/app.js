const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/database");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestsRouter = require("./routes/requests");
const userRouter = require("./routes/user");

const app = express(); //Instance of express application, server

app.use(express.json()); //Middleware for parse incoming request with JSON payload.

app.use(cookieParser());

app.use("/", authRouter);

app.use("/", profileRouter);

app.use("/", requestsRouter);

app.use("/", userRouter);

connectDB()
  .then(() => {
    console.log("Database connection established!");
    app.listen(3001, () => {
      console.log("Server is running on port 3001", "http://localhost:3001");
    });
  })
  .catch((err) => {
    console.err("Database can not be connected!", err);
  });
