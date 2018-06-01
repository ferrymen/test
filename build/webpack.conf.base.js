const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './dev/main.js',
  output: {
    path: resolve(__dirname, '../dist'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader'
      }
    ]
  },
  devServer: {
    open: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'dev/index.html',
      filename: 'index.html'
    })
  ]
}