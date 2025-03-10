import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
const Chat = () => {
  const { targetUserId } = useParams();
  const { targetFirstName, targetPhotoUrl } = useSearchParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const targetUser = {
    _id: targetUserId,
    firstName: targetFirstName,
    photoUrl: targetPhotoUrl,
  };
  const userId = user?._id;

  useEffect(() => {
    if (!userId) return;
    const socket = createSocketConnection();
    //Use this socket to emit events
    //As soon as page loads, socket connection is made & join the chat event emitted
    socket.emit("joinChat", { userId, targetUserId });

    socket.on("messageReceived", ({ firstName, text }) => {
      setMessages((messages) => [
        ...messages,
        {
          firstName,
          text,
          photoUrl:
            targetUser.firstName === firstName
              ? targetUser.photoUrl
              : user.photoUrl,
        },
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  return (
    <>
      <div className="lg:w-1/2 mx-auto my-5 bg-gray-100 rounded-lg p-2">
        {messages.length > 0 &&
          messages.map((message, index) => (
            <div
              className={`chat ${
                targetUser?.firstName === message.firstName
                  ? "chat-start"
                  : "chat-end"
              }`}
              key={index}
            >
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src={message?.photoUrl}
                  />
                </div>
              </div>
              <div className="chat-header">{message?.firstName}</div>
              <div className="chat-bubble">{message?.text}</div>
            </div>
          ))}
      </div>
      <div className=" join lg:w-1/2 mx-auto rounded-lg flex justify-between">
        <input
          type="text"
          placeholder="Message"
          className="input input-md w-full bg-gray-100"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button className="btn btn-neutral join-item" onClick={sendMessage}>
          Send
        </button>
      </div>
    </>
  );
};
export default Chat;
