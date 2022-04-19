const webpack = require("webpack");
const path = require("path");
const fs = require("fs");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/main.js",
  mode: "development",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  node: {
    fs: "empty",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      },      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    alias: { 
      'vue$': 'vue/dist/vue.esm.js',
      components : path.resolve(__dirname, 'src/components'), 
      view : path.resolve(__dirname, 'src/view'), 
      mixins : path.resolve(__dirname, 'src/mixins') 
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  plugins: [
    new webpack.DefinePlugin({
      DEPLOYED_ADDRESS: JSON.stringify(
        fs.readFileSync("deployedAddress", "utf8").replace(/\n|\r/g, "")
      ),
      DEPLOYED_ABI:
        fs.existsSync("deployedABI") && fs.readFileSync("deployedABI", "utf8"),

      DEPLOYED_ADDRESS_TOKENSALES: JSON.stringify(
        fs
          .readFileSync("deployedAddress_TokenSales", "utf8")
          .replace(/\n|\r/g, "")
      ),
      DEPLOYED_ABI_TOKENSALES:
        fs.existsSync("deployedABI_TokenSales") &&
        fs.readFileSync("deployedABI_TokenSales", "utf8"),
    }),
    new CopyWebpackPlugin([{ from: "./src/index.html", to: "index.html" }]),
  ],
  devServer: { contentBase: path.join(__dirname, "dist"), compress: true },
};
