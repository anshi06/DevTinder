const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const router = express.Router();

//Get all the pending connection requests for the loggedIn user
router.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", [
      "firstName",
      "lastName",
      "photoUrl",
      "age",
      "gender",
      "about",
      "skills",
    ]);

    res.json({
      message: "Connection requests fetched successfully!",
      data: connectRequests,
    });
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

router.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectRequests = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", [
        "firstName",
        "lastName",
        "photoUrl",
        "age",
        "gender",
        "about",
        "skills",
      ])
      .populate("toUserId", [
        "firstName",
        "lastName",
        "photoUrl",
        "age",
        "gender",
        "about",
        "skills",
      ]);

    const data = connectRequests.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      } else {
        return row.fromUserId;
      }
    });

    res.json({
      message: "Connection requests fetched successfully!",
      data,
    });
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

router.get("/user/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit; //Sanitize the limit
    const skip = (page - 1) * limit;
    //User should avoid certain cards.
    //1. His own card.
    //2. User's connections.
    //3. User's already ignored people.
    //4. Whom Already sent the connection request.

    //Find all the connection requests (sent+recieved)
    const connectionRequest = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromUserId toUserId");

    const hiddenUsers = new Set();

    connectionRequest.forEach((each) => {
      hiddenUsers.add(each.fromUserId.toString());
      hiddenUsers.add(each.toUserId.toString());
    });

    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hiddenUsers) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .select([
        "firstName",
        "lastName",
        "photoUrl",
        "age",
        "gender",
        "about",
        "skills",
      ])
      .skip(skip)
      .limit(limit);

    res.send(users);
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

module.exports = router;
