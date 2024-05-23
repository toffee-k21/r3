const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const userRouter = require("./routes/user");
const chatRouter = require("./routes/chat");
const ItemRouter = require("./routes/item");
require("./dbConfig/dbconfig");
const secretkey = "secretkey";
const { Server, Socket } = require("socket.io");
const Chat = require("./models/Chat");

const app = express();
app.use(cors());

const io = new Server({
  cors: true,
});

const socketIds = new Map();

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

app.use("/chat", chatRouter);


// app.use("/chat", chatRouter)

app.listen(5000, () => {
  console.log("server started");
});
//connection is reserved
io.on("connection", (socket) => {
  console.log("new connection");
  // console.log(socket);
  socket.on("registerUser", (data) => {
    // console.log(data.userId);
    socketIds.set(data.userId, socket.id);
  });
  socket.on("message-initialize", async (data) => {
    // socketIds.set(data.from);
    //data=>touserid fromuserid message
    const socketId = socketIds.get(data.to);
    socket.to(socketId).emit("message", { data });
    const enterData = await Chat.create(
      {
        from: data.from,
        to: data.to,
        messages: [],
      },
      // { $push: { messages: data.message } }
    );
    const updatemessage = await Chat.updateOne({
      $push: { messages: data.message },
    });
    // const enterData = await Chat.updateOne(
    //   {$push:{messages:data.message}}
    // );
    // res.end();
  });

  socket.on("check-req", (user) => {
    console.log("cheking /user", user);
  });
  socket.on("room-entry", (room) => {
    console.log(room);
    socket.to(user).emit("hello", "hello");
  });
});

io.listen(5001);
