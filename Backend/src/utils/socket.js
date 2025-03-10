const socket = require("socket.io");

const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on("connection", (socket) => {
    //Handle events
    socket.on("joinChat", ({ userId, targetUserId }) => {
      const room = [userId, targetUserId].sort().join("_"); //Should be unique id for room
      socket.join(room);
    });

    socket.on("sendMessage", ({ firstName, userId, targetUserId, text }) => {
      const roomId = [userId, targetUserId].sort().join("_");
      //Transfer message to the room
      io.to(roomId).emit("messageReceived", { firstName, text });
    });
    socket.on("disconnect", () => {});
  });
};
module.exports = initializeSocket;
