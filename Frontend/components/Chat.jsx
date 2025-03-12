import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const { targetUserId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const targetFirstName = searchParams.get("targetFirstName");
  const targetPhotoUrl = searchParams.get("targetPhotoUrl");
  const userId = user?._id;

  const fetchChatMessages = async () => {
    const chatMessages = await axios.get(BASE_URL + "/chat/" + targetUserId, {
      withCredentials: true,
    });
    const data = chatMessages.data.messages.map((message) => {
      return {
        firstName: message.senderId.firstName,
        photoUrl: message.senderId.photoUrl,
        text: message.text,
      };
    });
    setMessages((messages) => [...messages, ...data]);
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);

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
            targetFirstName === firstName ? targetPhotoUrl : user.photoUrl,
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
      <div className="h-screen flex flex-col gap-3 justify-around items-center mx-6">
        <div className="w-full mx-10 lg:w-1/2 lg:mx-auto bg-gray-100 rounded-lg lg:p-2 h-2/3 overflow-y-scroll my-3">
          {messages.length > 0 &&
            messages.map((message, index) => (
              <div
                className={`chat ${
                  targetFirstName === message.firstName
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
        <div className=" join w-full mx-10 lg:w-1/2 lg:mx-auto rounded-lg flex justify-between h-1/3">
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
      </div>
    </>
  );
};
export default Chat;
