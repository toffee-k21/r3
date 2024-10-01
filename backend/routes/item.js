const express = require("express");
const Item = require("../models/Item");
const Chat = require("../models/Chat");
const ItemRouter = express.Router();

ItemRouter.get("/", (req, res) => {
  res.send("hello");
});

ItemRouter.get("/view", async (req, res) => {
  const allItems = await Item.find({});
  res.send(allItems);
});

ItemRouter.post("/add", async (req, res) => {
  const addItem = await Item.create({
    imgUrl:req.body.imgUrl,
    itemName: req.body.itemName,
    category: req.body.category,
    priceForDay: req.body.priceForDay,
    desc: req.body.desc,
    location: req.body.location,
    userId: req.body.userId,
  });
  // const result = addItem
  // console.log(addItem);
  if (addItem) res.send({ result: "Successfully added !" });
});

ItemRouter.delete("/", async (req,res)=>{
  const data = await Item.deleteOne(req.body);
  res.send({result:"Item Deleted !"})
})

module.exports = ItemRouter;
