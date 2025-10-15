// module.exports = {
//   plugins: {
//     tailwindcss: {},
//     autoprefixer: {},
//   },
// }

// // postcss.config.js (ES Module - FIXES ERROR)
// export default {
//   plugins: {
//     tailwindcss: {},
//     autoprefixer: {},
//   },
// };

export default {
  plugins: {
    // Correctly reference the Tailwind CSS plugin
    // 'tailwindcss/nesting': {}, // Use if you use nested CSS rules
    'tailwindcss': {},
    'autoprefixer': {}, // Always include for browser compatibility
  },
};