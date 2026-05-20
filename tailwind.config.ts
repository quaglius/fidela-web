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
        "negro-fidela":   "#363630",
        "blanco-fidela":  "#EFF0EA",
        "pantone-fidela": "#D5D7C7",
        "velvet":         "#7E2738",
        "linaje":         "#CB6F36",
        "roble":          "#496130",
        "brisa":          "#77C1EC",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      transitionDuration: {
        "250": "250ms",
      },
    },
  },
  plugins: [],
};
export default config;
