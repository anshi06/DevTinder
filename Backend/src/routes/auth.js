const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { validateSignUpData } = require("../utils/validation");

const router = express.Router();

router.post("/signup", async (req, res) => {
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

router.post("/login", async (req, res) => {
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

router.post("/logout", async (req, res) => {
  res
    .cookie("token", null, {
      expires: new Date(Date.now()),
    })
    .send("User Logout successfully!");
});

module.exports = router;
