/** @type {import('tailwindcss').Config} */
export const content = [
  "./index.html",
  "./src/**/*.{js,jsx,ts,tsx}",
];
export const theme = {
  extend: {
    colors: {
      primary: "#4F46E5",
      secondary: "#EC4899",
      dark: "#111827",
      light: "#F3F4F6"
    },
  },
};
export const plugins = [];
