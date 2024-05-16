const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    userName:String,
    email:String,
    password:String
})

const User = new mongoose.model("user", userSchema);

module.exports = User;