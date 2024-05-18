const  mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
    itemName:String,
    category:String,
    priceForDay:Number,
    desc:String,
    location:String,
    userId:String,
    // createdAt:Date,
})

const Item = mongoose.model("item",ItemSchema);

module.exports = Item;