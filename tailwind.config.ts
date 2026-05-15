import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        mono: ["var(--font-mono)", "Roboto Mono", "ui-monospace", "monospace"],
        sans: ["var(--font-mono)", "Roboto Mono", "ui-monospace", "monospace"],
        serif: ["var(--font-mono)", "Roboto Mono", "ui-monospace", "monospace"],
      },
      transitionDuration: {
        "250": "250ms",
      },
    },
  },
  plugins: [],
};
export default config;
