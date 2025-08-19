import React, { useState } from "react";
import { askOllama } from "../ollamaService";
import "./ChatBox.css";

function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", text: input }];
    setMessages(newMessages);

    const reply = await askOllama(input);

    setMessages([...newMessages, { role: "ai", text: reply }]);
    setInput("");
  };

  return (
    <div className="chat-container">
      <div className="chat-window">
        {messages.map((m, i) => (
          <div key={i} className={`msg ${m.role}`}>
            <b>{m.role === "user" ? "Sen" : "AI"}:</b> {m.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Mesaj yaz..."
        />
        <button onClick={sendMessage}>Gönder</button>
      </div>
    </div>
  );
}

export default ChatBox;
