const path = require("path");
const webpack = require("webpack");

/*
 * We've enabled MiniCssExtractPlugin for you. This allows your app to
 * use css modules that will be moved into a separate CSS file instead of inside
 * one of your module entries!
 *
 * https://github.com/webpack-contrib/mini-css-extract-plugin
 *
 */
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

/*
 * We've enabled HtmlWebpackPlugin for you! This generates a html
 * page for you when you compile webpack, which will make you start
 * developing and prototyping faster.
 *
 * https://github.com/jantimon/html-webpack-plugin
 *
 */

module.exports = {
  mode: "development",

  devtool: "eval",

  devServer: {
    host: "localhost",
    port: 8080,
  },

  entry: path.resolve(__dirname, "src/index.js"),

  plugins: [
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" }),
    new HtmlWebpackPlugin({
      template: "index.html",
      title: "Canvas based Dot Lattice using native JS",
    }),
  ],

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [path.resolve(__dirname, "src")],
        loader: "babel-loader",
      },
      {
        test: /.(sa|sc|c)ss$/,

        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",

            options: {
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader",

            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
};
