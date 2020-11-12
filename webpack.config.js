const path = require(`path`);

module.exports = {
  entry: [
    `./js/server.js`,
    `./js/form.js`,
    `./js/map.js`,
    `./js/moving.js`,
    `./js/pin.js`,
    `./js/debounce.js`,
    `./js/filter.js`,
    `./js/popup.js`,
    `./js/main.js`
  ],
  output: {
    filename: `bundle.js`,
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};


