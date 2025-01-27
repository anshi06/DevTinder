const express = require("express");
const bcrypt = require("bcrypt");
const connectDB = require("./config/database");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");

const app = express(); //Instance of express application, server

app.use(express.json()); //Middleware for parse incoming request with JSON payload.

app.post("/signup", async (req, res) => {
  try {
    //Validation of Data
    validateSignUpData(req);

    //Encrypt your password
    const { firstName, lastName, emailId, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10); // 10 rounds of encyption and autogenerate a salt

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    //create instance of the user modal
    await user.save();
    res.send("User added successfully!");
  } catch (err) {
    res.status(400).send("ERROR:" + err);
  }
});

//Feed API - get all the users from the database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.send(400).send("Something went wrong");
  }
});

//Delete a user
app.delete("/user", async (req, res) => {
  const userId = req.body.id;
  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("User deleted successfully!");
  } catch (err) {
    res.status(400).send("Something went wrong!");
  }
});

//Update the user
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = ["skills", "photoUrl", "about", "gender", "age"];

    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );

    if (!isUpdateAllowed) {
      throw new Error("Update not allowed!");
    }

    if (data?.skills.length > 10) {
      throw new Error("Skills can not be more than 10");
    }

    const user = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
      runValidators: true,
    });
    res.send("User update successfully!");
  } catch (err) {
    res.status(400).send("Something went wrong!", err);
  }
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
