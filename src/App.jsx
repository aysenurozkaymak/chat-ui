import React, { useState } from "react";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const askOllama = async (prompt) => {
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama3:latest", // terminaldeki model ismi
        prompt: prompt,
        stream: false
      }),
    });

    const data = await response.json();
    return data.response;
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", text: input }];
    setMessages(newMessages);

    const reply = await askOllama(input);

    setMessages([...newMessages, { role: "ai", text: reply }]);
    setInput("");
  };

  return (
    <div style={styles.chatContainer}>
      <div style={styles.chatWindow}>
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              ...styles.msg,
              ...(m.role === "user" ? styles.userMsg : styles.aiMsg),
            }}
          >
            <b>{m.role === "user" ? "Sen" : "AI"}:</b> {m.text}
          </div>
        ))}
      </div>
      <div style={styles.chatInput}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Mesaj yaz..."
          style={styles.input}
        />
        <button onClick={sendMessage} style={styles.button}>Gönder</button>
      </div>
    </div>
  );
}

const styles = {
  body: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    margin: 0,
    background: "#f0f0f0",
  },
  chatContainer: {
    width: "400px",
    height: "600px",
    display: "flex",
    flexDirection: "column",
    background: "white",
    borderRadius: "10px",
    boxShadow: "0px 0px 15px rgba(0,0,0,0.2)",
    fontFamily: "Arial, sans-serif",
  },
  chatWindow: {
    flex: 1,
    padding: "10px",
    overflowY: "auto",
  },
  msg: {
    margin: "5px 0",
    padding: "8px 12px",
    borderRadius: "15px",
    maxWidth: "70%",
  },
  userMsg: {
    alignSelf: "flex-end",
    background: "#0084ff",
    color: "white",
  },
  aiMsg: {
    alignSelf: "flex-start",
    background: "#e5e5ea",
    color: "black",
  },
  chatInput: {
    display: "flex",
    borderTop: "1px solid #ddd",
  },
  input: {
    flex: 1,
    padding: "10px",
    border: "none",
    borderRadius: "0 0 0 10px",
    outline: "none",
  },
  button: {
    background: "#0084ff",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "0 0 10px 0",
    cursor: "pointer",
  },
};
export default App;
