/** @type {import('tailwindcss').Config} */
// './src/**/*.{js,jsx,ts,tsx}'
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
    './src/components/**/**/*.{js,jsx,ts,tsx}',
    './src/features/**/*.{js,jsx,ts,tsx}',
    './src/features/**/**/*.{js,jsx,ts,tsx}',
  ],

  theme: {
    extend: {
      width: {
        150: '150px',
        190: '190px',
        225: '225px',
        275: '275px',
        300: '300px',
        340: '340px',
        350: '350px',
        375: '375px',
        460: '460px',
        656: '656px',
        880: '880px',
        508: '508px',
        '20vw': '20vw',
        '40vw': '40vw',
        '80vw': '80vw',
        '2/5': '40%',
        '200': '200px',
        '250': '250px',
      },
      height: {
        80: '80px',
        150: '150px',
        225: '225px',
        300: '300px',
        340: '340px',
        370: '370px',
        400: '400px',
        420: '420px',
        510: '510px',
        600: '600px',
        650: '650px',
        685: '685px',
        800: '800px',
        '20vh': '20vh',
        '40vh': '40vh',
        '80vh': '80vh',
        '90vh': '90vh',
        '100vh': '100vh',
        200: '200px',
      },
      minWidth: {
        210: '210px',
        350: '350px',
        620: '620px',
      },
      minHeight: {
        1000: "1000px",
      },
      maxWidth:{
        1024: "1024px",
        1280: "1280px",
        1536: "1536px",
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      background: {
        btn: 'linear-gradient(238deg, #09153f 1.24%, #002bc2 57.38%)'
      },
      borderRadius:{
        '100': '100px',
        '500': '500px',
        '1/2': '50%',
      },
      colors: {
        'vivid-blue': '#0048FF',
        'deep-blue': '#002B9A',
        'logo-color': '#38bdf8',
        'header-color': '#0f172a',
        'pinkish-purple': 'rgba(214, 0, 141, 0.64)',
        'light-blue': 'rgba(138,215,224,255)',
        'vivid-pink': '#D6008D',
        'dark-gray': '#222',
        'dark-blue': '#0D2A41',
        green: 'green',
        orange: 'orange',
        red: 'red',
        'charcoal':'#333',
        'translucent-blue': 'rgba(64, 123, 255, 0.15)',
        'medium-gray': '#555',
      },
      keyframes:{
        scaling: {
          '0%, 100%': {
            transform: 'scale(0.2)',
            background: '#D6008D',
          },
          '50%': {
            transform: 'scale(1)',
            background: '#0761ff',
          }
        }
      },
      aspectRatio:{
        '6/5': '6 / 5',
      },
    },
  },
  plugins: [],
};