const express = require("express");
const Item = require("../models/Item");
const Chat = require("../models/Chat");
const ItemRouter = express.Router();

ItemRouter.get("/",(req,res)=>{
res.send("hello");
});

ItemRouter.post("/", async (req, res) => {
  // console.log(req.body.to, req.body.from);
  const data = await Chat.find({ from: req.body.from });
  res.send(data);
});

ItemRouter.get("/view",async(req,res)=>{
const allItems = await Item.find({}); 
res.send(allItems);
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
// const result = addItem
console.log(addItem);
if (addItem) res.send({ result: "Successfully added !" });
});

module.exports = ItemRouter;