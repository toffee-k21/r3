const express = require("express");
const Chat = require("../models/Chat");

const chatRouter = express.Router();

chatRouter.get("/:id", async (req, res) => {
  const userId = req.params.id;
  // console.log()
  const data = await Chat.find({ $or: [{ from: userId }, { to: userId }] });
  res.json(data);
});
chatRouter.post("/", async (req, res) => {
  // console.log(req.body.to, req.body.from);
  const data = await Chat.findOne({
    $or: [{ from: req.body.from }, { to: req.body.from }],
  });
  res.send(data);
});

module.exports = chatRouter;
