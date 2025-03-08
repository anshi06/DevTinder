const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
    membershipType: { type: String },
    isPremium: { type: Boolean, default: false },
  },
  { timestamps: true }
);

//Don't use Arrow function, this keyword don't work inside arrow function
userSchema.methods.getJwt = async function () {
  const user = this; //Represent the instance of the modal
  //Create a JWT Token
  const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return token;
};

userSchema.methods.validatePassword = async function (password) {
  const user = this;
  const isPasswordValid = await bcrypt.compare(password, user.password);
  return isPasswordValid;
};

const UserModal = mongoose.model("User", userSchema);

module.exports = UserModal;
