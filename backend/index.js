const express = require("express");
const userRouter = require("./routes/user");
const connect = require("./dbConfig/dbconfig");

connect().then("hello")

const app = express();

app.use(express.json()); //middleware for form data

app.get("/",(req,res)=>{
    res.send("hello");
})

app.use("/user", userRouter);

app.listen(5000, ( )=>{
    console.log("server started")
})