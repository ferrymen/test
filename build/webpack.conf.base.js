const { resolve } = require('path')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'bell-ui': resolve(__dirname, '../src'),
      'vue$': resolve(__dirname, '../node_modules/vue/dist/vue.esm.js')
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
        ],
        include:[resolve(__dirname, '..', 'src/style')]
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      // {
      //   test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      //   loader: 'url-loader',
      //   query: {
      //     limit: 10000,
      //     name: resolve(__dirname,'../static/img/[name].[hash:7].[ext]')
      //   }
      // },
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}