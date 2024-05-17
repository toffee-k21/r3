const express = require("express");
const userRouter = require("./routes/user");
const User = require("./models/user");
const jwt = require("jsonwebtoken")
require("./dbConfig/dbconfig");
const secretkey = "secretkey"; 

const app = express();

app.use(express.json()); //middleware for form data

app.get("/",verifyToken,(req,res)=>{
    res.send("hello");
})

function verifyToken(req,res,next){
const token = req.headers.token;
if(token){
    jwt.verify(token, secretkey, (err,done)=>{
    if(err){
        res.send("token invalid");
    } else{
        next();
    }
    });
}else{
    res.send("token not available")
}
}

app.use("/user", userRouter);

app.listen(5000, ( )=>{
    console.log("server started")
})