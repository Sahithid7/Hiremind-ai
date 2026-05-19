/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#101828",
        graphite: "#344054",
        mist: "#f4f7fb",
        line: "#d9e1ec",
        signal: "#2563eb",
        mint: "#0f9f6e",
        coral: "#f9735b",
        amber: "#f59e0b"
      },
      boxShadow: {
        soft: "0 20px 60px rgba(16, 24, 40, 0.10)"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "Segoe UI", "sans-serif"]
      }
    }
  },
  plugins: []
};
