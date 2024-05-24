/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#05acc1",
        "primary-content": "#c7f8fe",
        "primary-dark": "#04808f",
        "primary-light": "#06d8f3",

        secondary: "#7805c1",
        "secondary-content": "#e9c7fe",
        "secondary-dark": "#59048f",
        "secondary-light": "#9706f3",

        background: "#eff0f0",
        foreground: "#fbfbfb",
        border: "#dee0e0",

        copy: "#171717",
        "copy-light": "#636869",
        "copy-lighter": "#898e8f",
        "copy-dark": "#0F0F0F",

        success: "#05c105",
        warning: "#c1c105",
        error: "#c10505",

        "success-content": "#c7fec7",
        "warning-content": "#000000",
        "error-content": "#fec7c7",
      },
      fontFamily: {
        'sans': ['Open Sans', 'sans-serif'], // Default font family
        'serif': ['Sanchez', 'serif'], // Optional font family
      },
    },
  },
  plugins: [],
}

// module.exports = {
//   theme: {
//       extend: {
//           colors: {
//               primary: "#05acc1",
//               "primary-content": "#c7f8fe",
//               "primary-dark": "#04808f",
//               "primary-light": "#06d8f3",

//               secondary: "#7805c1",
//               "secondary-content": "#e9c7fe",
//               "secondary-dark": "#59048f",
//               "secondary-light": "#9706f3",

//               background: "#eff0f0",
//               foreground: "#fbfbfb",
//               border: "#dee0e0",

//               copy: "#252727",
//               "copy-light": "#636869",
//               "copy-lighter": "#898e8f",

//               success: "#05c105",
//               warning: "#c1c105",
//               error: "#c10505",

//               "success-content": "#c7fec7",
//               "warning-content": "#000000",
//               "error-content": "#fec7c7"
//           },
//       }
//   },
// }
