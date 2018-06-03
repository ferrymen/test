const { resolve } = require('path')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  resolve: {
    extensions: ['.vue', '.js', '.json'],
    alias: {
      'bell-ui': resolve(__dirname, '../src')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          // cssModules: {
          //   localIdentName: '[name]-[local]-[hash:base64:5]',
          //   camelCase: true
          // }
        }
      },
      {
        test: /\.scss$/,
        // loader: 'style-loader!css-loader?modules!sass-loader'
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]-[hash:base64:5]'
            }
          },
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}