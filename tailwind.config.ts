import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-primary": "var(--color-bg-primary)",
        "bg-secondary": "var(--color-bg-secondary)",
        surface: "var(--color-surface)",
        "silver-100": "var(--color-silver-100)",
        "silver-300": "var(--color-silver-300)",
        "silver-500": "var(--color-silver-500)",
        "chrome-700": "var(--color-chrome-700)",
        "gold-300": "var(--color-gold-300)",
        "gold-500": "var(--color-gold-500)",
        "gold-700": "var(--color-gold-700)",
        "text-primary": "var(--color-text-primary)",
        "text-secondary": "var(--color-text-secondary)",
        "text-muted": "var(--color-text-muted)",
        success: "var(--color-success)",
        error: "var(--color-error)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
      },
      boxShadow: {
        "gold-glow": "var(--shadow-gold-glow)",
      },
      transitionTimingFunction: {
        apple: "var(--ease-apple)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"],
        headline: ["var(--font-bebas)", "Impact", "sans-serif"],
      },
    },
  },
};

export default config;
