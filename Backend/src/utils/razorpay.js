const Razorpay = require("razorpay");
let instance = new Razorpay({
  key_id: "YOUR_KEY",
  key_secret: "YOUR_SECRET_KEY",
});

module.exports = instance;
