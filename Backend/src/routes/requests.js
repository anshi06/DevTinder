const express = require("express");
const { userAuth } = require("../middlewares/auth");

const router = express.Router();

router.get("/sendConnectionRequest", async (req, res) => {});

module.exports = router;
