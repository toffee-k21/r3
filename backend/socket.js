const Chat = require("./models/Chat");
const Redis = require("ioredis");

// const redis_Pass = process.env.REDIS_PASS
// const pub = new Redis({
//   host: "caching-65088eb-rcube2004-c101.f.aivencloud.com",
//   port: "10119",
//   username: "default",
//   password: redis_Pass,
// });

module.exports = (io, userIdToSocketIdMap) => {
  io.on("connection", (socket) => {
    console.log("new connection socet id: ",socket.id);

    socket.on("registerUser", (data) => {
      //   console.log("user-registed");
      userIdToSocketIdMap.set(data.userId, socket.id);
      socket.emit("registered-user",socket.id)
    //   console.log("user-id : ", data.userId, " socket-id: ", socket.id);
    });

    socket.on("message", async (data) => {
      const socketIdOfSeller = userIdToSocketIdMap.get(data.to);
      // const socketIdOfBuyer = userIdToSocketIdMap.get(data.from);
      socket.to(socketIdOfSeller).emit("message", data);
      // socket.to(socketIdFrom).emit("message", data);

      const findInstance = await Chat.findOne({
        $or: [
          { from: data.from, to: data.to },
          { from: data.to, to: data.from },
        ],
      });
      //   console.log(findInstance);

      if (findInstance) {
        const enterData = await Chat.findOneAndUpdate(
          {
            $or: [
              { from: data.from, to: data.to },
              { from: data.to, to: data.from },
            ],
          },
          { $push: { messages: `${data.from} : ${data.message} ` } }
        );
      } else {
        const createInstance = await Chat.create({
          from: data.from,
          to: data.to,
          messages: `${data.from} : ${data.message} `,
        });
      }
    });
  });
};
