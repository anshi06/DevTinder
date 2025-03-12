const socket = require("socket.io");
const crypto = require("crypto");
const Chat = require("../models/chat");

const getSecretRoomId = (userId, targetUserId) => {
  let roomId = crypto .createHash("sha256")
  .update([userId, targetUserId].sort().join("$"))
  .digest("hex");
  return roomId;
};

const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on("connection", (socket) => {
    //Handle events
    socket.on("joinChat", ({ userId, targetUserId }) => {
      const room = getSecretRoomId(userId, targetUserId); //Should be unique id for room
      socket.join(room);
    });

    socket.on(
      "sendMessage",
      async ({ firstName, userId, targetUserId, text }) => {
        const roomId = getSecretRoomId(userId, targetUserId);
        //Save message to the database
        try {
          //Todo-Check userId and targetUserId are friends

          let chat = await Chat.findOne({
            participants: { $all: [userId, targetUserId] },
          });

          if (!chat) {
            chat = new Chat({
              participants: [userId, targetUserId],
              messages: [],
            });
          }

          chat.messages.push({
            senderId: userId,
            text,
          });

          await chat.save();
        } catch (err) {
          console.error(err);
        }

        //Transfer message to the room
        io.to(roomId).emit("messageReceived", { firstName, text });
      }
    );
    socket.on("disconnect", () => {});
  });
};
module.exports = initializeSocket;
