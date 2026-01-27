import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../services/api";

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
      .catch(err => console.error("Conversation load error", err));
  }, [senderId]);

  /* ================= LOAD MESSAGES ================= */
  const loadMessages = async cid => {
    try {
      const res = await api.get(`/messages/conversation/${cid}`);
      setMessages(res.data);
    } catch (err) {
      console.error("Message load error", err);
    }
  };

  /* ================= AUTO OPEN CHAT (FROM EXCHANGE) ================= */
  useEffect(() => {
    if (!senderId || !receiverIdFromUrl) return;

    const openFromExchange = async () => {
      setActiveChat({
        userId: Number(receiverIdFromUrl),
        name: receiverNameFromUrl || "User"
      });

      try {
        const res = await api.post("/messages/init", {
          senderId,
          receiverId: Number(receiverIdFromUrl)
        });

        const cid = res.data.conversationId;
        setConversationId(cid);
        loadMessages(cid);
      } catch (err) {
        console.error("Auto open chat error", err);
      }
    };

    openFromExchange();
  }, [senderId, receiverIdFromUrl]);

  /* ================= OPEN CHAT FROM LEFT PANEL ================= */
  const openChat = async convo => {
    setActiveChat({
      userId: convo.otherUserId,
      name: convo.otherUserName
    });

    try {
      const res = await api.post("/messages/init", {
        senderId,
        receiverId: convo.otherUserId
      });

      const cid = res.data.conversationId;
      setConversationId(cid);
      loadMessages(cid);
    } catch (err) {
      console.error("Init chat error", err);
    }
  };

  /* ================= SEND MESSAGE ================= */
  const sendMessage = async () => {
    if (!input.trim() || !conversationId || !activeChat) return;

    try {
      await api.post("/messages/send", {
        senderId,
        receiverId: activeChat.userId,
        content: input
      });

      setInput("");
      loadMessages(conversationId);
    } catch (err) {
      console.error("Send message error", err);
    }
  };

  return (
    <div style={{ display: "flex", height: "calc(100vh - 60px)" }}>
      {/* ================= LEFT PANEL ================= */}
      <div style={{ width: 300, borderRight: "1px solid #ddd", padding: 16 }}>
        <h3>{username}</h3>

        {conversations.length === 0 && (
          <p style={{ color: "#777" }}>No conversations</p>
        )}

        {conversations.map(c => (
          <div
            key={c.conversationId}
            onClick={() => openChat(c)}
            style={{
              padding: 10,
              cursor: "pointer",
              borderBottom: "1px solid #eee"
            }}
          >
            <b>{c.otherUserName}</b>
            <div style={{ fontSize: 12, color: "#666" }}>
              {c.lastMessage}
            </div>
          </div>
        ))}
      </div>

      {/* ================= RIGHT PANEL ================= */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {!activeChat ? (
          <div style={{ margin: "auto", color: "#777" }}>
            Select a chat to start messaging
          </div>
        ) : (
          <>
            {/* HEADER */}
            <div style={{ padding: 16, borderBottom: "1px solid #ddd" }}>
              <b>{activeChat.name}</b>
            </div>

            {/* MESSAGES */}
            <div
              style={{
                flex: 1,
                padding: 20,
                overflowY: "auto",
                background: "#fafafa"
              }}
            >
              {messages.map(m => (
                <div
                  key={m.id}
                  style={{
                    marginBottom: 10,
                    textAlign:
                      m.senderId === senderId ? "right" : "left"
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      padding: "8px 12px",
                      borderRadius: 18,
                      background:
                        m.senderId === senderId
                          ? "#3897f0"
                          : "#e4e6eb",
                      color:
                        m.senderId === senderId
                          ? "white"
                          : "black"
                    }}
                  >
                    {m.content}
                  </span>
                </div>
              ))}
            </div>

            {/* INPUT */}
            <div
              style={{
                display: "flex",
                padding: 10,
                borderTop: "1px solid #ddd"
              }}
            >
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Type a message..."
                style={{
                  flex: 1,
                  padding: 10,
                  borderRadius: 20,
                  border: "1px solid #ccc"
                }}
                onKeyDown={e => e.key === "Enter" && sendMessage()}
              />
              <button
                onClick={sendMessage}
                style={{
                  marginLeft: 10,
                  padding: "8px 16px",
                  borderRadius: 20,
                  border: "none",
                  background: "#3897f0",
                  color: "white",
                  cursor: "pointer"
                }}
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
