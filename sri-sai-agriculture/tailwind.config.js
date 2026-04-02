/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink:     "#064e3b", // Deep dark green for text/footer (emerald-900)
        ink2:    "#065f46", // Dark green secondary (emerald-800)
        blue:    "#15803d", // Primary Green replacing blue (green-700)
        blue2:   "#16a34a", // Hover Green replacing blue2 (green-600)
        sky:     "#f0fdf4", // Light green bg replacing sky (green-50)
        sky2:    "#dcfce7", // Light green accent replacing sky2 (green-100)
        orange:  "#dc2626", // Primary Red replacing orange (red-600)
        orange2: "#ef4444", // Hover Red replacing orange2 (red-500)
        green:   "#047857", // Deep Green
        green2:  "#059669", 
        gold:    "#b07d0a",
        gold2:   "#d4960e",
        cream:   "#ffffff", // Clean White
        border:  "#e2e8f0",
        muted:   "#6b7280",
      },
      fontFamily: {
        outfit: ["'Outfit'", "sans-serif"],
        sora: ["'Sora'", "sans-serif"],
        lora: ["'Lora'", "serif"],
      },
      backgroundImage: {
        "hero-1": "linear-gradient(115deg, #071428 0%, #0f2d6e 45%, #1347a0 100%)",
        "hero-2": "linear-gradient(115deg, #041a0e 0%, #064e2e 45%, #0e7c4b 100%)",
        "hero-3": "linear-gradient(115deg, #1a0e04 0%, #4a2d0a 45%, #c8900a 100%)",
      },
      maxWidth: { site: "1280px" },
      screens: {
        xs: "480px",
      },
      animation: {
        blink: "blink 1.5s infinite",
        fpulse: "fpulse 3s infinite",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%":       { opacity: "0.25" },
        },
        fpulse: {
          "0%, 100%": { boxShadow: "0 6px 22px rgba(220,38,38,.42)" }, // red-600 rgb
          "50%":       { boxShadow: "0 6px 30px rgba(220,38,38,.60)" },
        },
      },
    },
  },
  plugins: [],
};
