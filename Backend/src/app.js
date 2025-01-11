const express = require("express");

const app = express(); //Instance of express application, server

//We can not leave all these admin unauthenticated, we need to check if request is authrorized.
//Use middleware logic to authorization
app.use("/admin", (req, res, next) => {
  //Every request route /admin will go through this middleware
  console.log('auth middleware!')
  const token = "abc";
  const isAdminAuthorized = token === "abc";
  if (!isAdminAuthorized) {
    res.status(405).send("Not Authorized");
  } 
  else{
    next();
  }
});

app.get("/admin/getAllData", (req, res) => {
  //Route handler
  res.send("All data sent!");
});

app.get("/admin/deleteUser", (req, res) => {
  //Route handler
  res.send("User deleted!");
});

app.listen(3001, () => {
  console.log("Server is running on port 3001", "http://localhost:3001");
});
