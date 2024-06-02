const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  imgUrl: String,
  itemName: String,
  category: String,
  priceForDay: Number,
  desc: String,
  location: Object,
  userId: String,
  // createdAt:Date,
});

const Item = mongoose.model("item", ItemSchema);

module.exports = Item;
