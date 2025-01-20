const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://devTinder:devTinderNode@cluster0.kal2n.mongodb.net/DevTinder"
  );
};

module.exports = connectDB;

