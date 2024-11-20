/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enables dark mode via a class
  content: [
    "./index.html",    // Your root HTML file
    "./src/**/*.{js,ts,jsx,tsx}",  // Include all JSX/TSX/JS files in the src folder
  ],
  theme: {
    extend: {
      colors: {
        // You can define custom colors or dark mode color schemes here
        background: {
          light: '#f9fafb',  // Light background color
          dark: '#1f2937',   // Dark background color
        },
        text: {
          light: '#1f2937',  // Dark text color for light mode
          dark: '#f9fafb',   // Light text color for dark mode
        },
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['dark'], // Enable dark background utilities
      textColor: ['dark'],       // Enable dark text color utilities
      borderColor: ['dark'],     // Enable dark border utilities
    },
  },
  plugins: [],
}
