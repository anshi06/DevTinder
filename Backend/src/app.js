const express = require("express");

const app = express(); //Instance of express application, server

// app.use("/route", rH1, rH2, [rH3, rH4], rH5)

app.use("/user", [
  (req, res, next) => {
    //Route handler
    console.log("route handler 1");
    next();
  },
  (req, res, next) => {
    //Route handler 2
    console.log("route handler 2");
    next();
  },
  (req, res, next) => {
    //Route handler
    console.log("route handler 3");
    next();
  },
  (req, res, next) => {
    //Route handler
    console.log("route handler 4");
    next();
  },
  (req, res, next) => {
    //Route handler
    console.log("route handler 5");
    res.send("Response5!");
  },
]);

app.listen(3001, () => {
  console.log("Server is running on port 3001", "http://localhost:3001");
});
