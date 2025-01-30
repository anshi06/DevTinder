const express = require("express");
const { userAuth } = require("../middlewares/auth");

const router = express.Router();

router.get("/profile", userAuth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (err) {
    res.send(400).send("Something went wrong");
  }
});

module.exports = router;
