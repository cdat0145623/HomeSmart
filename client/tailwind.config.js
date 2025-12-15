/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: '#b88e2f',       // Màu vàng đồng
        dark: '#1e1e1e',       // Nền tối header/footer
        lightdark: '#2c2c2c',  // Màu nền section
        light: '#f5f5f5',      // Màu sáng cho hover hoặc background trắng nhẹ
      },
    },
  },
  plugins: [],
}
