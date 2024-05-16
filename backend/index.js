const express = require("express");
const userRouter = require("./routes/user");
const User = require("./models/user");
require("./dbConfig/dbconfig");

const app = express();

app.use(express.json()); //middleware for form data

app.get("/",async(req,res)=>{
    // const user = await User.find(req.body);
    // if(user){

    // }
    res.send("hello");
})

app.use("/user", userRouter);

app.listen(5000, ( )=>{
    console.log("server started")
})