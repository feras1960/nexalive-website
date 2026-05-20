/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                texacore: {
                    emerald: '#1B8C78',
                    'emerald-light': '#2AAE97',
                    'emerald-dark': '#15705F',
                    gold: '#D4A853',
                    'gold-light': '#E6C97A',
                    dark: '#1a1a1a',
                    'dark-light': '#2a2a2a',
                    cream: '#F5F5F0',
                    'cream-dark': '#E8E8E0',
                },
                texafab: {
                    emerald: '#059669',
                    slate: '#1E293B',
                    cream: '#F8FAFC',
                    gold: '#F97316',
                    dark: '#0F172A',
                    teal: '#10B981',
                    navy: '#1E3A5F',
                    theme: '#059669',
                },
                // NexaLive Brand Colors
                nexa: {
                    primary: '#00D4AA',
                    'primary-light': '#33DDBB',
                    'primary-dark': '#00A888',
                    accent: '#FF6B35',
                    'accent-light': '#FF8F66',
                    success: '#00D4AA',
                    warning: '#FFB800',
                    danger: '#FF3366',
                    // Dark theme surfaces
                    'deep-dark': '#0a0a0f',
                    dark: '#0f0f17',
                    surface: '#12121a',
                    'surface-elevated': '#1a1a2e',
                    'surface-hover': '#22223a',
                    border: 'rgba(255,255,255,0.08)',
                    'border-hover': 'rgba(255,255,255,0.15)',
                    // Light theme surfaces
                    'light-bg': '#F8FAFC',
                    'light-surface': '#FFFFFF',
                    'light-elevated': '#F1F5F9',
                    'light-hover': '#E2E8F0',
                    'light-border': '#E2E8F0',
                    'light-border-hover': '#CBD5E1',
                    // Text colors
                    'text-primary': '#FFFFFF',
                    'text-secondary': '#888899',
                    'text-muted': '#555566',
                    'light-text-primary': '#0F172A',
                    'light-text-secondary': '#475569',
                    'light-text-muted': '#94A3B8',
                },
                // Keep backwards compat
                nexalive: {
                    blue: '#3B82F6',
                    cyan: '#06B6D4',
                    sos: '#EF4444',
                    success: '#10B981',
                    'deep-dark': '#0a0a0f',
                    dark: '#0f0f17',
                },
            },
            fontFamily: {
                sans: ['Inter', 'SF Pro Display', '-apple-system', 'system-ui', 'sans-serif'],
                arabic: ['IBM Plex Sans Arabic', 'Noto Sans Arabic', 'Tajawal', 'system-ui', 'sans-serif'],
                mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
                display: ['Inter', 'SF Pro Display', '-apple-system', 'system-ui', 'sans-serif'],
            },
            animation: {
                'fade-in': 'fadeIn 0.6s ease-out',
                'fade-in-up': 'fadeInUp 0.7s ease-out',
                'fade-in-down': 'fadeInDown 0.7s ease-out',
                'slide-up': 'slideUp 0.6s ease-out',
                'slide-in-left': 'slideInLeft 0.6s ease-out',
                'slide-in-right': 'slideInRight 0.6s ease-out',
                'scale-in': 'scaleIn 0.5s ease-out',
                'float': 'float 6s ease-in-out infinite',
                'float-slow': 'floatSlow 8s ease-in-out infinite',
                'float-reverse': 'floatReverse 7s ease-in-out infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'pulse-neon': 'pulseNeon 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'glow': 'glow 3s ease-in-out infinite',
                'shimmer': 'shimmer 2s linear infinite',
                'gradient-shift': 'gradientShift 8s ease infinite',
                'mesh-pulse': 'meshPulse 2s ease-in-out infinite',
                'draw-line': 'drawLine 1.5s ease-out forwards',
                'spin-slow': 'spin 12s linear infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(40px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeInDown: {
                    '0%': { opacity: '0', transform: 'translateY(-20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideInLeft: {
                    '0%': { opacity: '0', transform: 'translateX(-40px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                slideInRight: {
                    '0%': { opacity: '0', transform: 'translateX(40px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                scaleIn: {
                    '0%': { opacity: '0', transform: 'scale(0.9)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                floatSlow: {
                    '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
                    '33%': { transform: 'translateY(-12px) rotate(1deg)' },
                    '66%': { transform: 'translateY(-6px) rotate(-1deg)' },
                },
                floatReverse: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(15px)' },
                },
                pulseNeon: {
                    '0%, 100%': { opacity: '1', boxShadow: '0 0 20px rgba(0, 212, 170, 0.4)' },
                    '50%': { opacity: '.8', boxShadow: '0 0 40px rgba(0, 212, 170, 0.6)' },
                },
                glow: {
                    '0%, 100%': { filter: 'drop-shadow(0 0 10px rgba(0, 212, 170, 0.5))' },
                    '50%': { filter: 'drop-shadow(0 0 30px rgba(0, 212, 170, 0.8))' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                },
                gradientShift: {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                },
                meshPulse: {
                    '0%, 100%': { opacity: '0.4', r: '3' },
                    '50%': { opacity: '1', r: '5' },
                },
                drawLine: {
                    '0%': { strokeDashoffset: '1000' },
                    '100%': { strokeDashoffset: '0' },
                },
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                'nexa-gradient': 'linear-gradient(135deg, #00D4AA 0%, #3B82F6 50%, #8B5CF6 100%)',
                'nexa-gradient-dark': 'linear-gradient(135deg, #00A888 0%, #2563EB 50%, #7C3AED 100%)',
                'mesh-gradient': 'radial-gradient(at 40% 20%, rgba(0,212,170,0.15) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(59,130,246,0.1) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(139,92,246,0.1) 0px, transparent 50%)',
            },
            boxShadow: {
                'nexa': '0 0 30px rgba(0, 212, 170, 0.15)',
                'nexa-lg': '0 0 60px rgba(0, 212, 170, 0.2)',
                'nexa-card': '0 4px 24px rgba(0, 0, 0, 0.12)',
                'nexa-card-hover': '0 8px 40px rgba(0, 0, 0, 0.2)',
                'light-card': '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)',
                'light-card-hover': '0 10px 30px rgba(0,0,0,0.1)',
            },
        },
    },
    plugins: [],
};
