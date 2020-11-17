const path = require(`path`);

module.exports = {
  entry: [
      `./js/main.js`,
      `./js/utils.js`,
      `./js/backend.js`,
      `./js/maps.js`,
      `./js/form.js`,
      `./js/pin-card.js`,
      `./js/condition.js`,
      `./js/filter.js`,
      `./js/map-pin.js`,
      `./js/card.js`,
      `./js/move.js`,
      `./js/image.js`
  ],
  output: {
      filename: `bundle.js`,
      path: path.resolve(__dirname),
      iife: true
  },
  devtool: false
};