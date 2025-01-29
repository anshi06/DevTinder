const express = require("express");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/database");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const { userAuth } = require("./middlewares/auth");

const app = express(); //Instance of express application, server

app.use(express.json()); //Middleware for parse incoming request with JSON payload.

app.use(cookieParser());

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

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("Invalid credentials!");
    }
    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      //Get a JWT Token
      const token = await user.getJwt();

      //Add the token to cookie and send the response back to the User
      res.cookie("token", token);

      res.send("User logged in successfully!");
    } else {
      throw new Error("Invalid credentials!");
    }
  } catch (err) {
    res.status(400).send("ERROR:" + err);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (err) {
    res.send(400).send("Something went wrong");
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
