import "tailwindcss";
import daisyui from "daisyui";
import themes from "daisyui/theme/object";

const config = {
  content: ["/index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        plantcare: {
          ...themes["[data-theme=light]"],
          primary: "#4CAF50",
          secondary: "#A3D9A5",
          accent: "#FFB74D",
          neutral: "#3E4E3F",
          "base-100": "#F0F8F4",
          info: "#81D4FA",
          success: "#66BB6A",
          warning: "#FFD54F",
          error: "#EF5350",
        },
      },
      {
        plantcareDark: {
          ...themes["[data-theme=dark]"],
          primary: "#81C784",
          secondary: "#2E7D32",
          accent: "#FF9800",
          neutral: "#C8E6C9",
          "base-100": "#1B2B1B",
          info: "#4FC3F7",
          success: "#388E3C",
          warning: "#FBC02D",
          error: "#E57373",
        },
      },
    ],
  },
};

export default config;
