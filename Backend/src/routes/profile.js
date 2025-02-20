const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");

const router = express.Router();

router.get("/profile/view", userAuth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (err) {
    res.send(400).send("Something went wrong");
  }
});

router.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    const user = req.user;

    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request");
    }

    Object.keys(req.body).forEach((key) => (user[key] = req.body[key]));

    await user.save();

    res.json({ message: "Profile updated successfully!", data: user });
  } catch (err) {
    res.status(400).send(`Something went wrong! ${err}`);
  }
});

module.exports = router;
