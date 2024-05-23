const express = require("express");
const Chat = require("../models/Chat");

const chatRouter = express.Router();

chatRouter.get("/:id", async (req, res) => {
  const userId = req.params.id;
  // console.log()
  const data = await Chat.find({ $or: [{ from: userId }, { to: userId }] });
  res.json(data);
});

module.exports = chatRouter;
