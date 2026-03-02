import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Sidebar from "./components/Sidebar";
import { COLORS, GRADIENTS, SPACING, RADIUS, SHADOWS } from "./constants/theme";

function App() {
  // ============================
  // STATES
  // ============================
  const [chats, setChats] = useState([
    {
      id: "chat-1",
      title: "New Chat",
      messages: [
        { role: "system", text: "Hello! I am your ASD Assistant. Ask me anything about Autism Spectrum Disorder." }
      ]
    },
  ]);
  const [activeChatId, setActiveChatId] = useState("chat-1");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  // Get active chat object
  const activeChat = chats.find((c) => c.id === activeChatId) || chats[0];

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeChat.messages, loading]);

  // ============================
  // FUNCTIONS
  // ============================

  const updateChatMessages = (chatId, newMessages) => {
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === chatId ? { ...chat, messages: newMessages } : chat
      )
    );
  };

  const updateChatTitle = (chatId, newTitle) => {
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === chatId ? { ...chat, title: newTitle } : chat
      )
    );
  };

  const submitQuery = async () => {
    if (!query.trim()) return;

    const currentChatId = activeChatId;
    const userMessage = { role: "user", text: query };

    // update messages with user query
    const updatedMessages = [...activeChat.messages, userMessage];
    updateChatMessages(currentChatId, updatedMessages);

    // Auto-rename chat if it's the first user message
    if (activeChat.messages.length <= 1 && activeChat.title === "New Chat") {
      const newTitle = query.length > 30 ? query.substring(0, 30) + "..." : query;
      updateChatTitle(currentChatId, newTitle);
    }

    setQuery("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/query",
        { query: userMessage.text }, // In future, send history for context if backend supports it
        { headers: { "Content-Type": "application/json" } }
      );

      const botMessage = { role: "bot", text: response.data.answer };
      updateChatMessages(currentChatId, [...updatedMessages, botMessage]);
    } catch (error) {
      const errorMessage = { role: "bot", text: "Error connecting to backend. Please try again." };
      updateChatMessages(currentChatId, [...updatedMessages, errorMessage]);
    }

    setLoading(false);
  };

  const createNewChat = () => {
    const newChat = {
      id: `chat-${Date.now()}`,
      title: "New Chat",
      messages: [{ role: "system", text: "Hello! I am your ASD Assistant. Ask me anything about Autism Spectrum Disorder." }]
    };

    setChats([newChat, ...chats]);
    setActiveChatId(newChat.id);
    setQuery("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submitQuery();
    }
  };

  // ============================
  // UI
  // ============================

  return (
    <div style={styles.appContainer}>
      <div style={styles.overlay}></div>

      {/* Sidebar */}
      <Sidebar
        chats={chats}
        activeChatId={activeChatId}
        onNewChat={createNewChat}
        onSelectChat={setActiveChatId}
      />

      {/* Main Chat Area */}
      <div style={styles.mainContent}>

        {/* Header */}
        <div style={styles.header}>
          <h2 style={styles.headerTitle}>{activeChat.title}</h2>
        </div>

        {/* Messages List */}
        <div style={styles.messagesContainer}>
          {activeChat.messages.map((msg, index) => (
            <div
              key={index}
              style={{
                ...styles.messageWrapper,
                justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
              }}
            >
              <div
                style={{
                  ...styles.messageBubble,
                  background:
                    msg.role === "user"
                      ? COLORS.userMessageBackground
                      : COLORS.answerBackground,
                  color: msg.role === "user" ? "#FFFFFF" : COLORS.textPrimary,
                  border: msg.role === "user" ? `1px solid ${COLORS.accent}` : `1px solid ${COLORS.cardBorder}`,
                }}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {loading && (
            <div style={styles.messageWrapper}>
              <div style={{ ...styles.messageBubble, background: COLORS.answerBackground, color: COLORS.loading }}>
                Generating answer...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div style={styles.inputArea}>
          <div style={styles.inputWrapper}>
            <textarea
              rows="1"
              placeholder="Ask a question..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              style={styles.queryInput}
            />
            <button onClick={submitQuery} style={styles.sendButton} disabled={!query.trim() || loading}>
              ➤
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;

// ============================================================================
// STYLES
// ============================================================================

const styles = {
  appContainer: {
    display: "flex",
    height: "100vh",
    width: "100vw",
    overflow: "hidden",
    fontFamily: "'Inter', sans-serif",
    position: "relative",
    background: COLORS.backgroundGradient, // Fallback if image fails
    color: COLORS.textPrimary,
    backgroundImage: `
      linear-gradient(
        ${COLORS.overlay},
        ${COLORS.overlay}
      ),
      url("/bg-autism.jpg")
    `,
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  overlay: {
    position: "absolute",
    inset: 0,
    backdropFilter: "blur(5px)", // Stronger blur for background
    zIndex: 0,
    pointerEvents: "none",
  },

  mainContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    position: "relative",
    zIndex: 1,
    height: "100%",
    background: "rgba(15, 23, 42, 0.4)", // Slight tint over blur
  },

  header: {
    padding: `${SPACING.md} ${SPACING.xl}`,
    borderBottom: `1px solid ${COLORS.cardBorder}`,
    background: "rgba(15, 23, 42, 0.3)",
    backdropFilter: "blur(10px)",
  },
  headerTitle: {
    margin: 0,
    fontSize: "1.2rem",
    fontWeight: 600,
    color: COLORS.heading,
  },

  messagesContainer: {
    flex: 1,
    padding: SPACING.xl,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: SPACING.md,
  },

  messageWrapper: {
    display: "flex",
    width: "100%",
  },
  messageBubble: {
    maxWidth: "70%",
    padding: `${SPACING.md} ${SPACING.lg}`,
    borderRadius: RADIUS.lg,
    fontSize: "1rem",
    lineHeight: "1.6",
    whiteSpace: "pre-line",
    boxShadow: SHADOWS.answer,
  },

  inputArea: {
    padding: SPACING.lg,
    background: "rgba(15, 23, 42, 0.8)", // Darker bottom
    borderTop: `1px solid ${COLORS.cardBorder}`,
    display: "flex",
    justifyContent: "center",
  },
  inputWrapper: {
    width: "100%",
    maxWidth: "800px",
    position: "relative",
    display: "flex",
    alignItems: "center",
    background: COLORS.inputBackground,
    borderRadius: RADIUS.full,
    border: `1px solid ${COLORS.inputBorder}`,
    padding: "4px 8px 4px 20px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
  },
  queryInput: {
    flex: 1,
    background: "transparent",
    border: "none",
    color: "#fff",
    fontSize: "1rem",
    padding: "12px 0",
    resize: "none",
    outline: "none",
    fontFamily: "inherit",
  },
  sendButton: {
    background: GRADIENTS.buttonPrimary,
    color: "#fff",
    border: "none",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    marginLeft: SPACING.sm,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.2rem",
    transition: "transform 0.2s",
    boxShadow: "0 2px 10px rgba(59, 130, 246, 0.4)",
  },
};
