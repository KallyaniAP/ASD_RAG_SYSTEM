import React from "react";
import { COLORS, GRADIENTS, SPACING, RADIUS } from "../constants/theme";

function Sidebar({ chats, activeChatId, onNewChat, onSelectChat }) {
  return (
    <div style={styles.sidebar}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.logoText}>ASD Assistant</h1>
      </div>

      {/* New Chat Button */}
      <button
        style={styles.newChatButton}
        onClick={onNewChat}
        onMouseEnter={(e) => e.target.style.background = GRADIENTS.buttonHover}
        onMouseLeave={(e) => e.target.style.background = GRADIENTS.buttonPrimary}
      >
        <span style={{ fontSize: "1.2rem", marginRight: SPACING.xs }}>+</span> New Chat
      </button>

      {/* Heading */}
      <h3 style={styles.sectionTitle}>RECENT CHATS</h3>

      {/* Chat List */}
      <div style={styles.chatList}>
        {chats.map((chat) => {
          const isActive = chat.id === activeChatId;
          return (
            <div
              key={chat.id}
              onClick={() => onSelectChat(chat.id)}
              style={{
                ...styles.chatItem,
                background: isActive ? GRADIENTS.activeChat : "transparent",
                borderLeft: isActive ? `3px solid ${COLORS.highlight}` : "3px solid transparent",
                color: isActive ? COLORS.heading : COLORS.textSecondary,
              }}
              onMouseEnter={(e) => !isActive && (e.target.style.background = "rgba(255,255,255,0.05)")}
              onMouseLeave={(e) => !isActive && (e.target.style.background = "transparent")}
            >
              <span style={{ marginRight: SPACING.sm }}>💬</span>
              {chat.title}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  sidebar: {
    width: "300px",
    background: COLORS.sidebarBackground,
    backdropFilter: "blur(20px)",
    borderRight: `1px solid ${COLORS.sidebarBorder}`,
    display: "flex",
    flexDirection: "column",
    padding: SPACING.lg,
    zIndex: 10,
    color: "#fff",
  },
  header: {
    marginBottom: SPACING.xl,
    textAlign: "center",
  },
  logoText: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    margin: 0,
    background: GRADIENTS.logo,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    letterSpacing: "0.5px",
  },
  newChatButton: {
    background: GRADIENTS.buttonPrimary,
    color: COLORS.buttonText,
    border: "none",
    borderRadius: RADIUS.md,
    padding: `${SPACING.md} ${SPACING.lg}`,
    fontWeight: "600",
    fontSize: "1rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 15px rgba(59, 130, 246, 0.4)",
    transition: "transform 0.2s, box-shadow 0.2s",
    marginBottom: SPACING.xxl,
  },
  sectionTitle: {
    fontSize: "0.75rem",
    fontWeight: "700",
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
    textTransform: "uppercase",
    letterSpacing: "1px",
    paddingLeft: SPACING.xs,
  },
  chatList: {
    flex: 1,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  chatItem: {
    padding: `${SPACING.sm} ${SPACING.md}`,
    borderRadius: `0 ${RADIUS.md} ${RADIUS.md} 0`,
    cursor: "pointer",
    fontSize: "0.95rem",
    transition: "all 0.2s",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "flex",
    alignItems: "center",
  },
};

export default Sidebar;
