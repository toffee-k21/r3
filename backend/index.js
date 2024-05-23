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
  socket.on("initialize-message", async (data) => {
    //msg buyer means buyer ne msg kiya
    // socketIds.set(data.from);
    //data=>touserid fromuserid message
const value = await Chat.findOne({
  from:data.from,
  to:data.to
})
    if(value){
      const enterData = await Chat.create(data);
    }
  });
  
  socket.on("message", async (data) => {
    const enterData = await Chat.findOneAndUpdate(
      { from: data.from, to: data.to },
      { $push: { messages: data.message } }
    );
    const socketId = socketIds.get(data.to);
    socket.to(socketId).emit("message", { data });
  });
});

io.listen(5001);
