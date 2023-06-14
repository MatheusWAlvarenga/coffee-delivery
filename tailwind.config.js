/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        'tablet': '640px',
        'laptop': '800px',
        'desktop': '1200px',
        'monitor': '2100px',
      },

      fontFamily: {
        baloo2: ['"Baloo 2"', 'sans-serif'],
        roboto: ['"Roboto"', 'sans-serif'],
    
      },
      colors: {
        yellow: {
          dark: '#C47F17',
          light: '#F1E9C9',
          standard: '#DBAC2C',
        },
        purple: {
          dark: '#4B2995',
          light: '#EBE5F9',
          standard: '#8047F8',
        },
        base: {
          title: '#272221',
          subtitle: '#403937',
          text: '#574F4D',
          label: '#8D8686',
          hover: '#D7D5D5',
          button: '#E6E5E5',
          input: '#EDEDED',
          card: '#F3F2F2',
        },
        background: '#FAFAFA',
        white: '#FFFFFF',
      },
    },
  },
  plugins: [],
}
