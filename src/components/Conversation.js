import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMessages, sendMessage } from "../redux/actions/messageActions";

const ConversationComponent = () => {
  const [newMessage, setNewMessage] = useState("");
  const senderId = useSelector((state) => state.login.userId);
  const receiverId = useSelector((state) => state.message.selectedUser._id);
  const messages = useSelector((state) => state.message.messages);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMessages(senderId, receiverId));
  }, [dispatch, senderId, receiverId]);

  const handleSendMessage = () => {
    dispatch(
      sendMessage({
        senderId,
        receiverId,
        content: newMessage,
      })
    );

    setNewMessage("");
  };

  return (
    <div className="conversation-container">
      <div className="message-container">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${
              message.senderId === senderId ? "sender" : "receiver"
            }`}
          >
            {message.content}
          </div>
        ))}
      </div>
      <div className="input-containerk">
        <input
          type="text"
          className=""
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        &nbsp;&nbsp;&nbsp;
        <button className="send-button" onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ConversationComponent;
