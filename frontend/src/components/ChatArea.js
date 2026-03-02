import React, { useState } from "react";
import axios from "axios";

function ChatArea({ chat, onUpdateChat }) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const submitQuery = async () => {
    if (!query.trim()) return;

    setLoading(true);

    const userMessage = { role: "user", text: query };
    onUpdateChat(userMessage);

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/query",
        { query }
      );

      const botMessage = {
        role: "assistant",
        text: response.data.answer,
      };

      onUpdateChat(botMessage);
    } catch (e) {
      onUpdateChat({
        role: "assistant",
        text: "Error connecting to backend",
      });
    }

    setQuery("");
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.messages}>
        {chat.messages.map((msg, index) => (
          <p key={index}>
            <b>{msg.role}:</b> {msg.text}
          </p>
        ))}
      </div>

      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ask your autism-related question..."
        style={styles.textarea}
      />

      <button onClick={submitQuery}>Send</button>

      {loading && <p>Generating answer...</p>}
    </div>
  );
}

const styles = {
  container: {
    flex: 1,
    padding: "20px",
  },

  messages: {
    height: "70vh",
    overflowY: "auto",
    marginBottom: "10px",
  },

  textarea: {
    width: "100%",
    height: "80px",
  },
};

export default ChatArea;
