/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // 品牌色 — 与 Web 端保持一致
        brand: {
          DEFAULT: '#7C3AED',
          5: 'rgba(124,58,237,0.05)',
          10: 'rgba(124,58,237,0.1)',
          20: 'rgba(124,58,237,0.2)',
          30: 'rgba(124,58,237,0.3)',
          fg: '#4C1D95',
        },
        // 强调色 (CTA)
        accent: {
          DEFAULT: '#22C55E',
        },
        // 表面色
        surface: {
          DEFAULT: '#FFFFFF',
          muted: '#FAF5FF',
        },
        // 描边
        border: {
          line: 'rgba(124,58,237,0.1)',
        },
      },
      borderRadius: {
        btn: '12px',
        card: '16px',
        modal: '20px',
      },
      boxShadow: {
        'card-sm': '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        'card-md': '0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)',
        'card-lg': '0 10px 30px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.05)',
      },
      fontFamily: {
        sans: ['"PingFang SC"', '"Helvetica Neue"', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false, // 小程序不需要 CSS reset
  },
}
