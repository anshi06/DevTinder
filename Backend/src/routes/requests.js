const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const router = express.Router();

router.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
  try {
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    const allowedStatus = ["ignored", "interested"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid status type." });
    }

    const toUser = await User.findById(toUserId);
    if (!toUser) {
      return res.status(404).send({ message: "User not found" });
    }

    //Check for existing connection request.
    const existingConnectionRequest = await ConnectionRequest.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });

    if (existingConnectionRequest) {
      return res
        .status(400)
        .json({ message: "Connection request already exist!" });
    }

    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    });

    const data = await connectionRequest.save();

    res.json({ message: "Connection request sent successfully!", data });
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

router.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const requestId = req.params.requestId;
      const status = req.params.status;

      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ message: "Invalid status type." });
      }

      //Check for existing connection request.
      const existingConnectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      });

      if (!existingConnectionRequest) {
        return res
          .status(400)
          .json({ message: "Connection request does not exist!" });
      }

      existingConnectionRequest.status = status;

      const data = await existingConnectionRequest.save();

      res.json({ message: `Connection request ${status} successfully!`, data });
    } catch (err) {
      res.status(400).send("ERROR:" + err.message);
    }
  }
);

module.exports = router;
