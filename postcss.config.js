module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewportWidth: 720,
      viewportHeight: 1306,
      unitPrecision: 6,
      viewportUnit: "vw",
      selectorBlackList: [".ignore", ".hairlines", "van"],
      minPixelValue: 1,
      mediaQuery: false
    }
  }
};
