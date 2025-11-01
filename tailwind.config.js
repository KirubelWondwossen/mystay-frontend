/** @type {import('tailwindcss').Config} */

const config = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Poppins", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      colors: {
        primary: "#FF5A5F",
        secondary: "#008489",
        accent: "#00A699",
        background: "#F7F7F7",
        surface: "#FFFFFF",
        textPrimary: "#2D2D2D",
        textSecondary: "#767676",
        error: "#FF385C",
        dark: {
          primary: "#FF5A5F",
          secondary: "#00A699",
          accent: "#22C55E",
          backgroundDark: "#121212",
          surfaceDark: "#1E1E1E",
          textPrimary: "#F5F5F5",
          textSecondary: "#A0A0A0",
          error: "#FF385C",
        },
      },
      boxShadow: {
        card: "0 4px 10px rgba(0, 0, 0, 0.05)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
