/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink:     "#0b1220",
        ink2:    "#1e2d42",
        blue:    "#1347a0",
        blue2:   "#1c5abf",
        sky:     "#e8f0fe",
        sky2:    "#dbeafe",
        orange:  "#e05c1a",
        orange2: "#f07340",
        green:   "#0e7c4b",
        green2:  "#15a366",
        gold:    "#b07d0a",
        gold2:   "#d4960e",
        cream:   "#fafaf7",
        border:  "#e2e8f0",
        muted:   "#6b7280",
      },
      fontFamily: {
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
          "0%, 100%": { boxShadow: "0 6px 22px rgba(224,92,26,.42)" },
          "50%":       { boxShadow: "0 6px 30px rgba(224,92,26,.60)" },
        },
      },
    },
  },
  plugins: [],
};
