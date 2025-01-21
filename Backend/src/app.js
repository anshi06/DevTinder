const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express(); //Instance of express application, server

app.use(express.json()); //Middleware for parse incoming request with JSON payload.

app.post("/signup", async (req, res) => {
  //create instance of the user modal
  const user = new User(req.body);
  try {
    await user.save();
    res.send("User added successfully!");
  } catch (err) {
    res.status(500).send("Something went wrong!" + err)
  }
});

//Feed API - get all the users from the database
app.get("/feed", async(req, res) => {
  try{
    const users = await User.find({});
    res.send(users);
  }catch(err){
    res.send(400).send("Something went wrong")
  }
})

connectDB()
  .then(() => {
    console.log("Database connection established!");
    app.listen(3001, () => {
      console.log("Server is running on port 3001", "http://localhost:3001");
    });
  })
  .catch((err) => {
    console.err("Database can not be connected!", err);
  });
