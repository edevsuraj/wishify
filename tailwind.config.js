/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FBF7F0',
        paper: '#FFFDF9',
        ink: '#241C18',
        cocoa: '#5C4A40',
        taupe: '#7A6559',
        coral: {
          DEFAULT: '#E8607A',
          light: '#F6A6B2',
          deep: '#C94261',
        },
        gold: {
          DEFAULT: '#C99A3F',
          light: '#EBCB8B',
          deep: '#9C7423',
        },
        plum: '#4B2142',
        sage: '#7E9A83',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        elegant: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        script: ['Caveat', 'cursive'],
        fancy: ['"Dancing Script"', 'Caveat', 'cursive'],
        romantic: ['"Dancing Script"', 'Caveat', 'cursive'],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(36,28,24,0.04), 0 12px 32px -12px rgba(36,28,24,0.16)',
        lift: '0 2px 4px rgba(36,28,24,0.05), 0 28px 60px -24px rgba(36,28,24,0.28)',
        glow: '0 0 0 1px rgba(232,96,122,0.18), 0 24px 60px -20px rgba(232,96,122,0.45)',
        inner: 'inset 0 1px 0 rgba(255,255,255,0.6)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.75rem',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0) rotate(-2deg)' },
          '50%': { transform: 'translateY(-22px) rotate(1.5deg)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate(0,0) rotate(0deg)' },
          '50%': { transform: 'translate(16px,-20px) rotate(7deg)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.25', transform: 'scale(0.75)' },
          '50%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% center' },
          '100%': { backgroundPosition: '-200% center' },
        },
        heartRise: {
          '0%': { transform: 'translateY(24px) scale(0.6)', opacity: '0' },
          '18%': { opacity: '0.75' },
          '100%': { transform: 'translateY(-130px) scale(1.1) rotate(14deg)', opacity: '0' },
        },
        confettiFall: {
          '0%': { transform: 'translateY(-12%) rotate(0deg)', opacity: '0' },
          '8%': { opacity: '0.9' },
          '100%': { transform: 'translateY(115%) rotate(560deg)', opacity: '0.15' },
        },
        shoot: {
          '0%': { transform: 'translate3d(-10%, -10%, 0) rotate(35deg)', opacity: '0' },
          '12%': { opacity: '1' },
          '55%, 100%': { transform: 'translate3d(900px, 500px, 0) rotate(35deg)', opacity: '0' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.55', filter: 'blur(18px)' },
          '50%': { opacity: '0.95', filter: 'blur(26px)' },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '25%': { transform: 'translate(-2%, 2%)' },
          '50%': { transform: 'translate(2%, -1%)' },
          '75%': { transform: 'translate(-1%, -2%)' },
        },
        borderSpin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        bob: {
          '0%, 100%': { transform: 'translateY(0) rotate(-2deg)' },
          '50%': { transform: 'translateY(-8px) rotate(2deg)' },
        },
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        'float-slow': 'floatSlow 10s ease-in-out infinite',
        drift: 'drift 12s ease-in-out infinite',
        twinkle: 'twinkle 3.6s ease-in-out infinite',
        shimmer: 'shimmer 4s linear infinite',
        'heart-rise': 'heartRise 9s ease-in infinite',
        'confetti-fall': 'confettiFall 9s linear infinite',
        shoot: 'shoot 7s ease-in infinite',
        'pulse-glow': 'pulseGlow 5s ease-in-out infinite',
        grain: 'grain 1.4s steps(4) infinite',
        bob: 'bob 4.5s ease-in-out infinite',
        borderSpin: 'borderSpin 6s linear infinite',
      },
    },
  },
  plugins: [],
}
