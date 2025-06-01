import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            if (id.includes("firebase")) {
              return "vendor_firebase";
            }
            if (id.includes("react")) {
              return "vendor_react";
            }
            return "vendor";
          }
        },
      },
    },
  },
});
