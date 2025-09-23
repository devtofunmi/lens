import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Primary brand color for interactive elements.
        primary: "#4f46e5",
        // Text/icon color on primary background.
        "on-primary": "#ffffff",
        // Lighter background for primary elements.
        "primary-container": "#e0e7ff",
        // Text/icon color on primary-container background.
        "on-primary-container": "#1e1b4b",

        // Secondary brand color for less prominent elements.
        secondary: "#7c3aed",
        // Text/icon color on secondary background.
        "on-secondary": "#ffffff",
        // Lighter background for secondary elements.
        "secondary-container": "#ede9fe",
        // Text/icon color on secondary-container background.
        "on-secondary-container": "#2e1065",

        // Tertiary brand color for complementary accents.
        tertiary: "#9333ea",
        // Text/icon color on tertiary background.
        "on-tertiary": "#ffffff",
        // Lighter background for tertiary elements.
        "tertiary-container": "#f3e8ff",
        // Text/icon color on tertiary-container background.
        "on-tertiary-container": "#3b0764",

        // Color for errors and destructive actions.
        error: "#be123c",
        // Text/icon color on error background.
        "on-error": "#ffffff",
        // Lighter background for error-related elements.
        "error-container": "#ffe4e6",
        // Text/icon color on error-container background.
        "on-error-container": "#5f000b",

        // Overall page background color.
        background: "#f4f4f4",
        // Default text color on page background.
        "on-background": "#000000",

        // Background for components like cards, dialogs, etc.
        surface: "#ffffff",
        // Default text color on surface backgrounds.
        "on-surface": "#000000",
        // Variant of surface background for visual hierarchy.
        "surface-variant": "#eeeeee",
        // Text color on surface-variant backgrounds.
        "on-surface-variant": "#000000",

        // Color for outlines and borders.
        outline: "#e91e63",

        // Dark mode colors.
        dark: {
          background: "#212529",
          "on-background": "#f8fafc",
          surface: "#292c31",
          "on-surface": "#f8fafc",
          "surface-variant": "#292c31",
          "on-surface-variant": "#f8fafc",
          "primary-container": "#292c31",
          "on-primary-container": "#c7d2fe",
        }
      },
    },
  },
  plugins: [],
} satisfies Config;