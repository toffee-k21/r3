const mongoose = require("mongoose");


const chatSchema = new mongoose.Schema({
  messages: [String], // An array of message objects
  from: String,
  to:  String,
  // time: { type: String }
});

const Chat = mongoose.model("chat",chatSchema);

module.exports = Chat