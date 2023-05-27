/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/App.jsx",
    "./src/Components/Form.jsx",
    "./src/Components/Task.jsx",
  ],
  theme: {
    extend: {
      fontFamily: {
        RobotoMono: ["'Roboto Mono'", "monospace"],
      },
    },
  },
  plugins: [],
};
