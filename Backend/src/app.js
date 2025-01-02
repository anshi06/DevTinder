const express = require("express");

const app = express(); //Instance of express application, server

//Handle all the any incoming request
// app.use((req, res) => {
//     //Request handler function
//     res.send("Hello from the Express server!")
// })

//Handle different request according to route
app.use("/", (req, res) => {
    //Request handler function
    res.send("Hello from Dashboard!")
})

app.use("/test", (req, res) => {
    //Request handler function
    res.send("Hello from test!")
})

app.use("/hello", (req, res) => {
    //Request handler function
    res.send("Hello!")
})

app.listen(3000, () => {
    console.log("Server is running on port 3000", "http://localhost:3000")
})
