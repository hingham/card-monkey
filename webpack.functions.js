const webpack = require("webpack");

module.exports = {
  optimization: {
    minimize: false
  },
  mode: "development",
  plugins: [new webpack.DefinePlugin({ "global.GENTLY": false })]
};
