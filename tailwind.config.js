/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // toggled via 'dark' class
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Poppins", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      colors: {
        // ✅ Brand Indigo Shades
        brand: {
          500: "#6366F1",
          600: "#4F46E5", // Primary
          700: "#4338CA",
          800: "#3730A3",
          900: "#312E81",
        },

        // ✅ Light mode palette
        background: "#F9FAFB",
        surface: "#FFFFFF",
        tPrimary: "#111827",
        tSecondary: "#374151",
        tTertiary: "#9CA3AF", // for faded text/icons
        primary: "#4F46E5", // uses brand-600
        secondary: "#008489",
        accent: "#6366F1", // uses brand-500
        border: "#F3F4F6",
        "color-blue-100": "#E0F2FE", // for bg of circled icons
        "color-green-100": "#DCFCE7", // for bg of money circled icons

        // ✅ State colors
        success: "#15803D",
        warning: "#A16207",
        error: "#B91C1C",

        // ✅ Dark mode palette
        dark: {
          background: "#111827",
          surface: "#1F2937",
          "text-primary": "#F9FAFB",
          "text-secondary": "#D1D5DB",
          "text-tertiary": "#9CA3AF",
          border: "#374151",
          primary: "#4F46E5",
          secondary: "#00A699",
          accent: "#6366F1",
        },
      },

      borderRadius: {
        tiny: "3px",
        sm: "5px",
        md: "7px",
        lg: "9px",
      },

      boxShadow: {
        sm: "0 1px 2px rgba(0, 0, 0, 0.04)",
        md: "0px 0.6rem 2.4rem rgba(0, 0, 0, 0.06)",
        lg: "0 2.4rem 3.2rem rgba(0, 0, 0, 0.12)",
        darkSm: "0 1px 2px rgba(0, 0, 0, 0.4)",
        darkMd: "0px 0.6rem 2.4rem rgba(0, 0, 0, 0.3)",
        darkLg: "0 2.4rem 3.2rem rgba(0, 0, 0, 0.4)",
      },
    },
  },
  plugins: [],
};
