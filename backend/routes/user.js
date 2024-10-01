const express = require("express");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const secretkey = "secretkey"; 

const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {

  // const check = await User.findOne(req.body.email);//findOne object ya null return krega but find array of objects ya empty array return krega
  // if (check) {
  //   res.send("user Already exists");
  // } else {
    try {
      const data = await User.create({
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
      });
      // console.log(data);
      // res.redirect("/");
      res.send({result:"successfully created"});
    } catch (error) {
      console.log(error);
    }
  }
// }
);

userRouter.post("/signin", async(req, res) => {
  const userVal = await User.findOne(req.body);
  if(userVal){
const token = jwt.sign(req.body, secretkey);
res.json({result:token, userId:userVal._id});
// res.setHeader('Token',`bearer ${token}`);
// res.header = { 'Authentication':`bearer ${token}`}
// console.log(token);
// res.setHeader("Content-Type", "application/json");
  } else{
// console.log("na")
  }
  // res.redirect("/");

});

module.exports = userRouter;
