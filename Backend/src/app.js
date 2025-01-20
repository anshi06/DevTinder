const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user")

const app = express(); //Instance of express application, server

app.post("/signup", async (req, res) => {
  //create instance of the user modal
  const user = new User({
    firstName: "Anshika",
    lastName: "Upadhyay",
    emailId: "ansh@123gmail.com",
    password: "abc@123"
  });

  await user.save();

  res.send("User added successfully!")
});

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
