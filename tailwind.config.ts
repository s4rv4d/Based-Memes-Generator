import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "radial-at-tl": `radial-gradient(at top left, #03FF7080, #DC80FC00, transparent)`,
        "radial-at-br": `radial-gradient(at bottom right, ##03FF7080, #DC80FC00, transparent)`,
      },
      colors: {
        "custom-green": "#03FF7080",
        "custom-black": "#1C1C1C", // Use your own color hex code
        "create-form-bg": "#323232",
        "new-create-bg": "#525252",
        "custom-blue": "#125EFF",
        "primary-button": "#0252FF",
        "overlay-background": "rgba(0, 0, 0, 0.8)",
      },
    },
  },
  plugins: [],
};
export default config;
