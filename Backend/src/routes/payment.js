const express = require("express");
const { userAuth } = require("../middlewares/auth");
const rzpInstance = require("../utils/razorpay");
const Payment = require("../models/payment");
const User = require("../models/user")
const {
  validateWebhookSignature,
} = require("razorpay/dist/utils/razorpay-utils");
const paymentRouter = express.Router();

paymentRouter.post("/payment/create", userAuth, async (req, res) => {
  try {
    let options = {
      amount: 50000, //500 Rs. make order dynamic
      currency: "INR",
      receipt: "order_rcptid_11",
      notes: {
        firstName: req.user.firstName,
        membershipType: req.body.type,
      },
    };
    const order = await rzpInstance.orders.create(options);

    const payment = new Payment({
      userId: req.user._id,
      orderId: order.id,
      status: order.status,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      notes: {
        firstName: req.user.firstName,
        membershipType: order.notes.membershipType,
      },
    });

    //Save order details in databse
    const savedPayment = await payment.save();

    //Return back order details to frontend
    res.json(savedPayment);
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});

//Razorpay will call this api for giving the status of the payment.
paymentRouter.post("/payment/webhook", async (req, res) => {
  try {
    const iswebhookValid = validateWebhookSignature(
      JSON.stringify(webhookBody), //req.body
      webhookSignature, //req.headers["X-Razorpay-Signature"]
      webhookSecret //env file (when you set up webhook onrazorpay, that secret)
    );

    if (!iswebhookValid) {
      res.status(500).send("Webhook is not valid");
    }

    //Update the payment status in DB
    //Update the user as premium
    //Return success response to razorpay

    const paymentDetails = req.body.payload.payment.entity;

    const payment = await Payment.findOne({ orderId: paymentDetails.order_id });
    payment.status = paymentDetails.status;
    await payment.save();

    const user = await User.findOne({_id: paymentDetails.userId});
    user.isPremium = true;
    user.membershipType = payment.notes.membershipType;
    await user.save();

    if (req.body.event === "payment.captured") {
    }

    if (req.body.event === "payment.failed") {
    }

    return res.status(200).json({ msg: "Webhook received successfully!" });
  } catch (err) {}
});

module.exports = paymentRouter;
