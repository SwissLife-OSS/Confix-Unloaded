const { override, addBabelPreset, addWebpackAlias } = require("customize-cra");
const path = require("path");

module.exports = override(
  addWebpackAlias({
    "@generated": path.resolve(__dirname, "./src/__generated__"),
  }),
  addBabelPreset("@emotion/babel-preset-css-prop")
);
