/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['class', '[data-theme="nordic-dark"]'],
  theme: {
    extend: {
      colors: {
        // Palette personnalisée "Anthracite & Dark Graphite"
        nordic: {
          bg: '#131314',
          card: '#1E1E20',
          accent: '#3B82F6',
          cyan: '#06B6D4',
          steel: '#38BDF8',
          text: '#F3F4F6',
          muted: '#9CA3AF',
          border: '#2A2A2D',
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        "nordic-dark": {
          "primary": "#3B82F6",
          "secondary": "#06B6D4",
          "accent": "#38BDF8",
          "neutral": "#2A2A2D",
          "base-100": "#131314", // Fond principal anthracite neutre
          "base-200": "#1E1E20", // Cartes et blocs secondaires
          "base-300": "#2A2A2D", // Bordures et séparations
          "base-content": "#F3F4F6", // Texte clair haute lisibilité
          "info": "#06B6D4",
          "success": "#10B981",
          "warning": "#F59E0B",
          "error": "#EF4444",
        },
        "nordic-light": {
          "primary": "#2563EB",
          "secondary": "#1D4ED8",
          "accent": "#0284C7",
          "neutral": "#E2E8F0",
          "base-100": "#F8FAFC",
          "base-200": "#FFFFFF",
          "base-300": "#EDF2F7",
          "base-content": "#0F172A",
          "info": "#2563EB",
          "success": "#10B981",
          "warning": "#F59E0B",
          "error": "#EF4444",
        },
      },
    ],
    darkTheme: "nordic-dark",
  },
};