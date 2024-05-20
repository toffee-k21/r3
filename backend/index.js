const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const userRouter = require("./routes/user");
const ItemRouter = require("./routes/item");
require("./dbConfig/dbconfig");
const secretkey = "secretkey";
const { Server, Socket } = require("socket.io");

const app = express();
app.use(cors());

const io = new Server({
  cors: true,
});

app.use(express.json()); //middleware for form data

app.get("/", (req, res) => {
  res.send("hello");
});
//no req of middleware as it is not server side rendering
function verifyToken(req, res, next) {
  const token = req.headers.token;
  if (token) {
    jwt.verify(token, secretkey, (err, done) => {
      if (err) {
        res.send("token invalid");
      } else {
        next();
      }
    });
  } else {
    res.send("token not available");
  }
}

app.use("/user", userRouter);

app.use("/item", ItemRouter);

app.listen(5000, () => {
  console.log("server started");
});
//connection is reserved
io.on("connection", (socket) => {
  console.log("new connection");
  console.log(socket);
  socket.on("trade-call", (data) => {
    console.log(data);
    // const { data } = data
    const room = `${data.from} ${data.to}`;
    // socket.join(room);
    socket.join(data.to);
    socket.to(data.to).emit("room-entry", room); //sending room id
    // socket.to(room).emit("hello");
  });
  socket.on("check-req", (user) => {
    console.log("cheking /user",user);
    socket.join(user); //joining and accepting room id
    socket.on("room-entry", (room)=>{
console.log(room)
    });
  });
  // socket.on("room-entry", (room) => {
  //   console.log(room);
  // });
  // socket.on("accept-trade", (data) => {
  //   console.log(data);
  // });
  // socket.to().emit("")
});

io.listen(5001);
