/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: "var(--primary)",
                secondary: "var(--secondary)",
                accent: "var(--accent)",
                dark: "#050505",
                light: "#FCFCFC",
                "glass-light": "rgba(255, 255, 255, 0.5)",
                "glass-dark": "rgba(10, 10, 10, 0.5)",
            },
            fontFamily: {
                sans: ['Inter', 'Outfit', 'sans-serif'],
                heading: ['Outfit', 'sans-serif'],
            },
            boxShadow: {
                'glow': '0 0 20px rgba(99, 102, 241, 0.4)',
                'glow-lg': '0 0 40px rgba(99, 102, 241, 0.6)',
                'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.05)',
                'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.4)',
            },
            animation: {
                'blob': 'blob 10s infinite',
                'fade-in': 'fadeIn 0.5s ease-out forwards',
                'slide-up': 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                'gradient-x': 'gradientX 15s ease infinite',
                'float': 'float 6s ease-in-out infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                blob: {
                    '0%': { transform: 'translate(0px, 0px) scale(1)' },
                    '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
                    '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
                    '100%': { transform: 'translate(0px, 0px) scale(1)' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(40px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                gradientX: {
                    '0%, 100%': {
                        'background-size': '200% 200%',
                        'background-position': 'left center'
                    },
                    '50%': {
                        'background-size': '200% 200%',
                        'background-position': 'right center'
                    },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                }
            }
        },
    },
    plugins: [],
}
