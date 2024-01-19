const NodePath = require("node:path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const SpritePlugin = require("svg-sprite-loader/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const extractCss = true;

/** @type {import('webpack').Configuration} */
const config = {
  mode: "development",
  devtool: false,
  context: NodePath.resolve(__dirname, "src"),

  entry: "./main",

  output: {
    clean: true,
    path: NodePath.resolve(__dirname, "build"),
  },

  module: {
    rules: [
      {
        test: /\.svg$/,
        loader: "svg-sprite-loader",
        options: {
          extract: true,
          spriteFilename: "sprite-[hash:6].svg",
        },
        type: "javascript/auto",
      },
      {
        test: /\.css$/,
        use: [
          extractCss ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader",
        ],
      },
      // not working with html-webpack-plugin and svg-sprite-loader together
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
    ],
  },

  plugins: [
    extractCss ? new MiniCssExtractPlugin({ filename: "[name].css" }) : null,

    new HtmlWebpackPlugin({
      template: NodePath.resolve(__dirname, "./src/main.html"),
      filename: "main.html",
    }),
    new SpritePlugin(),
  ].filter(Boolean),
};

module.exports = config;
