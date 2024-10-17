const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const userRouter = require("./routes/user");
const chatRouter = require("./routes/chat");
const ItemRouter = require("./routes/item");
require("./config/dbconfig");
require("./config/cloudinary");
const secretkey = "secretkey";
const { Server, Socket } = require("socket.io");
const Chat = require("./models/Chat");
const UploadRouter = require("./routes/upload");
require("dotenv").config();

const app = express();
app.use(cors());

app.use(express.static("./uploads"));

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
app.use(express.urlencoded({ extended: false }));
app.use("/user", userRouter);

app.use("/item", ItemRouter);

app.use("/chat", chatRouter);

app.use("/upload", UploadRouter);

const userIdToSocketIdMap = new Map();

require("./socket")(io, userIdToSocketIdMap);

const PORT = 5000;
const server = app.listen(PORT || process.env.PORT, () => {
  console.log(`server started at ${PORT}`);
});

io.attach(server);
