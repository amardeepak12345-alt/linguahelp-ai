import { useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (!message) return;

    const userMsg = message;
    setMessage("");

    setChat((prev) => [...prev, { sender: "user", text: userMsg }]);

    try {
      const res = await axios.post("https://linguahelp-ai.onrender.com/api/chat/", {
        message: userMsg,
      });

      setChat((prev) => [
        ...prev,
        { sender: "bot", text: res.data.reply },
      ]);
    } catch (err) {
      setChat((prev) => [
        ...prev,
        { sender: "bot", text: "Backend not connected ❌" },
      ]);
    }
  };

  return (
    <div style={{ textAlign: "center", fontFamily: "Arial" }}>
      <h2>🧠 LinguaHelp AI Chat</h2>

      <div
        style={{
          height: "400px",
          width: "60%",
          margin: "20px auto",
          border: "1px solid #ccc",
          padding: "10px",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {chat.map((c, i) => (
          <div
            key={i}
            style={{
              alignSelf: c.sender === "user" ? "flex-end" : "flex-start",
              background: c.sender === "user" ? "#4f46e5" : "#e5e7eb",
              color: c.sender === "user" ? "white" : "black",
              padding: "10px",
              margin: "5px",
              borderRadius: "10px",
              maxWidth: "70%",
            }}
          >
            {c.text}
          </div>
        ))}
      </div>

      <div>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask your doubt..."
          style={{ width: "300px", padding: "10px" }}
        />
        <button onClick={sendMessage} style={{ padding: "10px" }}>
          Send
        </button>
      </div>
    </div>
  );
}

export default App;