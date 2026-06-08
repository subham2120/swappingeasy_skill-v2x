import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../services/api";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import "../styles/Messages.css";

function Messages() {
  const senderId = Number(localStorage.getItem("userId"));
  const username = localStorage.getItem("username");

  const [searchParams] = useSearchParams();
  const receiverIdFromUrl = searchParams.get("userId");
  const receiverNameFromUrl = searchParams.get("name");

  const [conversations, setConversations] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [conversationId, setConversationId] = useState(null);
  const [input, setInput] = useState("");

  /* ================= LOAD CONVERSATIONS ================= */
  useEffect(() => {
    if (!senderId) return;

    api
      .get(`/messages/my-conversations/${senderId}`)
      .then(res => setConversations(res.data))
      .catch(err => console.error(err));
  }, [senderId]);

  /* ================= LOAD MESSAGES ================= */
  const loadMessages = async cid => {
    try {
      const res = await api.get(`/messages/conversation/${cid}`);
      setMessages(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {

    if (!conversationId) return;

    const socket = new SockJS("http://localhost:8080/ws");

    const client = new Client({
      webSocketFactory: () => socket,

      onConnect: () => {

        client.subscribe(
          `/topic/chat/${conversationId}`,
          (message) => {

            const newMessage =
              JSON.parse(message.body);

            setMessages(prev => {

              const exists = prev.some(
                m => m.id === newMessage.id
              );

              return exists
                ? prev
                : [...prev, newMessage];
            });

          }
        );

      }
    });

    client.activate();

    return () => {
      client.deactivate();
    };

  }, [conversationId]);

  /* ================= AUTO OPEN CHAT ================= */
  useEffect(() => {
    if (!senderId || !receiverIdFromUrl) return;

    const openFromExchange = async () => {
      setActiveChat({
        userId: Number(receiverIdFromUrl),
        name: receiverNameFromUrl || "User"
      });

      const res = await api.post("/messages/init", {
        senderId,
        receiverId: Number(receiverIdFromUrl)
      });

      setConversationId(res.data.conversationId);
      loadMessages(res.data.conversationId);
    };

    openFromExchange();
  }, [senderId, receiverIdFromUrl]);

  /* ================= OPEN CHAT ================= */
  const openChat = async convo => {
    setActiveChat({
      userId: convo.otherUserId,
      name: convo.otherUserName
    });

    const res = await api.post("/messages/init", {
      senderId,
      receiverId: convo.otherUserId
    });

    setConversationId(res.data.conversationId);
    loadMessages(res.data.conversationId);
  };

  /* ================= SEND MESSAGE ================= */
  const sendMessage = async () => {
    if (!input.trim() || !conversationId) return;

    await api.post("/messages/send", {
      senderId,
      receiverId: activeChat.userId,
      content: input
    });

    setInput("");
    loadMessages(conversationId);
  };

  return (
    /* 🔥 MAIN WRAPPER (SIDEBAR + NAVBAR FIX) */
    <div className="messages-container">
        <div className="conversation-sidebar">
        <h3 className="chat-username">{username}</h3>

        {conversations.length === 0 && (
          <p className="no-conversations">No conversations</p>
        )}

        {conversations.map(c => (
        <div
          key={c.conversationId}
          onClick={() => openChat(c)}
          className={`conversation-item ${
            activeChat?.userId === c.otherUserId
              ? "active-conversation"
              : ""
          }`}
        >

          <div className="conversation-avatar">
            {c.otherUserName.charAt(0).toUpperCase()}
          </div>

          <div className="conversation-info">

            <b>{c.otherUserName}</b>

            <div className="last-message">
              {c.lastMessage}
            </div>

          </div>

        </div>
        ))}
      </div>

      {/* ================= CHAT AREA ================= */}
      <div className="chat-section">
        {!activeChat ? (
          <div className="empty-chat">
            Select a chat to start messaging
          </div>
        ) : (
          <>
            {/* HEADER */}
          {/* HEADER */}
          <div className="chat-header">

             <div className="chat-user">

                <div className="chat-avatar">
                   {activeChat.name.charAt(0)}
                </div>

                <div>
                   <b>{activeChat.name}</b>

                   <div className="online-status">
                      Online
                   </div>

                </div>

             </div>

          </div>

            {/* MESSAGES */}
           <div className="messages-area">
              {messages.map(m => (
                <div
                  key={m.id}
                  className={`message-row ${
                    m.senderId === senderId
                      ? "sent"
                      : "received"
                  }`}
                >
               <div
                 className={`message-bubble ${
                   m.senderId === senderId
                     ? "sent"
                     : "received"
                 }`}
               >
                    {m.content}
                  </div>
                </div>
              ))}
            </div>

            {/* INPUT */}
          <div className="chat-input-area">
              <input className="chat-input"
                value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Type a message..."
                  onKeyDown={e => e.key === "Enter" && sendMessage()}
              />
             <button
               className="send-btn"
               onClick={sendMessage}
             >
                Send
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Messages;
