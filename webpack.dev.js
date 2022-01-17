const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  context: path.resolve(
    "." + path.sep + "public" + path.sep + "javascripts" + path.sep + "rpg"
  ),
  entry: {
    app: "./." + path.sep + "Main.ts",
  },
  devtool: "source-map",
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
  },
  output: {
    path: path.resolve(
      __dirname,
      "." + path.sep + "public" + path.sep + "javascripts" + path.sep + "dist" + path.sep
    ),
    filename: "rpg.bundle.js",
  },
  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
      { test: /\.tsx?$/, loader: "ts-loader" },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { test: /\.js$/, loader: "source-map-loader" }
    ],
  },
};
