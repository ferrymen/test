const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackMerge = require('webpack-merge')
const Webpack = require('webpack')

const WebpackConfBase = require('./webpack.conf.base')

module.exports = WebpackMerge(WebpackConfBase, {
  mode: 'development',
  entry: './dev/main.js',
  output: {
    path: resolve(__dirname, '../dist'),
    filename: '[name].js'
  },
  devServer: {
    open: true,
    port: 9999
  },
  devtool: "#source-map",
  plugins: [
    new HtmlWebpackPlugin({
      template: 'dev/index.html',
      filename: 'index.html'
    }),
    // new Webpack.SourceMapDevToolPlugin()
  ]
})