const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/rcube").then(console.log("mongoDb connected"));

