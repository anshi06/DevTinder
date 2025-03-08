const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
    orderId: { type: String, required: true },
    status: { type: String, required: true },
    amount: { type: String, required: true },
    currency: { type: String, required: true },
    receipt: { type: String, required: true },
    notes: {
      firstName: { type: String, required: true },
      membershipType: { type: String, required: true },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
