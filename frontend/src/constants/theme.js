// ============================================================================
// THEME CONSTANTS - VIBRANT & GLASSMORPHIC
// ============================================================================

export const COLORS = {
    // Backgrounds
    backgroundGradient: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)", // Deep blue/slate base
    overlay: "rgba(15, 23, 42, 0.6)", // Darker overlay for contrast

    // Sidebar
    sidebarBackground: "rgba(30, 41, 59, 0.7)", // Glassy dark blue
    sidebarBorder: "rgba(255, 255, 255, 0.1)",

    // Main Card / Chat Area
    cardBackground: "rgba(30, 41, 59, 0.65)", // Semi-transparent dark
    cardBorder: "rgba(255, 255, 255, 0.08)",

    // Text
    heading: "#F8FAFC", // Almost white
    textPrimary: "#E2E8F0", // Light gray
    textSecondary: "#94A3B8", // Muted blue-gray

    // Accents (Neon/Vibrant)
    primary: "#3B82F6", // Bright Blue
    accent: "#8B5CF6", // Violet
    highlight: "#22D3EE", // Cyan

    // Interactive Elements
    buttonText: "#FFFFFF",
    inputBackground: "rgba(15, 23, 42, 0.6)",
    inputBorder: "rgba(255, 255, 255, 0.1)",
    inputFocus: "rgba(59, 130, 246, 0.5)", // Blue glow

    // System Messages
    answerBackground: "rgba(59, 130, 246, 0.1)", // Faint blue tint
    answerText: "#F1F5F9",
    userMessageBackground: "rgba(139, 92, 246, 0.25)", // Faint violet tint

    // Status
    loading: "#22D3EE", // Cyan for loading state
};

export const GRADIENTS = {
    logo: "linear-gradient(to right, #22D3EE, #8B5CF6)", // Cyan to Violet
    buttonPrimary: "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)", // Blue to Violet
    buttonHover: "linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)", // Darker Blue to Violet
    activeChat: "linear-gradient(90deg, rgba(59, 130, 246, 0.2), transparent)", // Subtle blue shine
};

export const SPACING = {
    xs: "8px",
    sm: "12px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    xxl: "48px",
};

export const RADIUS = {
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "24px",
    xxl: "32px",
    full: "9999px",
};

export const SHADOWS = {
    card: "0 8px 32px 0 rgba(0, 0, 0, 0.3)",
    answer: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    glow: "0 0 20px rgba(59, 130, 246, 0.4)", // Blue glow
};
