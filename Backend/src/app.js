const express = require("express");

const app = express(); //Instance of express application, server

app.use("/user", (req, res) => {
    res.send("Now I will run and won't give chance to any /user http method.");
});

//This will only handle GET call to "/user"
app.get("/user", (req, res) => {
  res.send({ firstName: "Anshika", lastName: "Upadhyay" });
});

//This will only handle POST call to "/user"
app.post("/user", (req, res) => {
  res.send("Data saved successfully!");
});

//This will only handle DELETE call to "/user"
app.delete("/user", (req, res) => {
    res.send("Data deleted successfully!");
});

//This will match all the http methods GET, POST, PATCH, PUT, DELETE API calls to '/test'
app.use("/test", (req, res) => {
  //Request handler function
  res.send("Hello from test!");
});

app.listen(3001, () => {
  console.log("Server is running on port 3001", "http://localhost:3001");
});
