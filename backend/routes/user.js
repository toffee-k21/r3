const express = require("express");
const User = require("../models/user");

const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {

  const check = await User.findOne(req.body.email);//findOne object ya null return krega but find array of objects ya empty array return krega
  if (check) {
    res.send("user Already exists");
  } else {
    try {
      const data = await User.create({
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
      });
      console.log(data);
      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  }
});

userRouter.post("/signin", async(req, res) => {
  const check = await User.findOne(req.body);
  if(check){
res.redirect("/")
  } else{
res.send("invalid user credentials")
  }
  res.redirect("/");
});

module.exports = userRouter;
