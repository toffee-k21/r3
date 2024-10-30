const express = require("express");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const secretkey = "secretkey"; 

const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {

    try {
      const data = await User.create({
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
      });

      res.send({result:"successfully created"});
    } catch (error) {
      console.log(error);
    }
  }

);

userRouter.post("/signin", async(req, res) => {
  const userVal = await User.findOne(req.body);
  if(userVal){
const token = jwt.sign(req.body, secretkey);
res.json({result:token, userId:userVal._id});
  } else{

  }

});

userRouter.get("/",async (req,res)=>{
  const userList = await User.find();
res.send(userList);
})

module.exports = userRouter;
