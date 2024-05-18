const express = require("express");
const Item = require("../models/Item");
const ItemRouter = express.Router();

ItemRouter.get("/",(req,res)=>{
res.send("hello")
});

ItemRouter.post("/add",async(req,res)=>{
const addItem = await Item.create({
  itemName: req.body.itemName,
  category: req.body.category,
  priceForDay: req.body.priceForDay,
  desc: req.body.desc,
  location: req.body.location,
  userId: req.body.userId,
});
const result = addItem
console.log(addItem);
res.end();
});

module.exports = ItemRouter;