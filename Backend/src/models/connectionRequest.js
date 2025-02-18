const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", //reference to the user collection
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: '{VALUE} is incorrect status type',
      },
      required: true,
    },
  },
  { timestamps: true }
);

//Compound Index
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 }); //Ascending order indexing

//It will be called when save method is called. pre is a middleware at schema level.
connectionRequestSchema.pre("save", function (next) {
  const connectionRequest = this;
  //Check if toUserId is save as fromUserId
  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("Cannot send connection request to yourself.");
  }
  next();
});


const ConnectionRequest = mongoose.model("Connection", connectionRequestSchema);

module.exports = ConnectionRequest;
