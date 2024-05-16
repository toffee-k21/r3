const express = require("express");
const User = require("../models/user");

const userRouter = express.Router();

userRouter.post("/signup", async(req, res) => {
  const value = req.body;
const check = await User.find(req.body)
if(check){
    res.send("user Already exists");
}
else{
   const data =  await User.create({
        userName:req.body.userName,
        email:req.body.email,
        password:req.body.password,
    })
    console.log(data)
}
});
userRouter.post("/signin", (req, res) => {
  const value = req.body;
});

module.exports = userRouter;