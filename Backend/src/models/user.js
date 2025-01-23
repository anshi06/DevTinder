const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, minLength: 4, maxLength: 50 },
    lastName: { type: String },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(emailId) {
        if (!validator.isEmail(emailId)) {
          throw new Error("Invalid email address!");
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(password) {
        if (!validator.isStrongPassword(password)) {
          throw new Error("Please provide strong password!");
        }
      },
    },
    age: { type: Number, min: 18 },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender data is not valid");
        }
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://www.pnrao.com/wp-content/uploads/2023/06/dummy-user-male.jpg",
      validate(url) {
        if (!validator.isURL(url)) {
          throw new Error("Invalid photoUrl!");
        }
      },
    },
    about: { type: String, default: "This is the default description" },
    skills: { type: [String] },
  },
  { timestamps: true }
);

const UserModal = mongoose.model("User", userSchema);

module.exports = UserModal;
