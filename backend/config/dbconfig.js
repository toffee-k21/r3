const mongoose = require("mongoose");
require("dotenv").config();
const pass = process.env.MONGO_PASSWAORD
mongoose
  .connect(
    `mongodb+srv://taufiq200421:${pass}@rcube.ke4cx.mongodb.net/rCube?retryWrites=true&w=majority&appName=Rcube`
  )
  .then(console.log("mongoDb connected"))
  .catch((err)=>console.log(err));
// mongoose.connect("mongodb://localhost:27017/rcube").then(console.log("mongoDb connected"));

