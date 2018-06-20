const path = require('path');
const merge = require('webpack-merge')
const config = require('../build/webpack.conf.base.js')

module.exports = (storybookBaseConfig, configType, defaultConfig) => {
  defaultConfig = merge(defaultConfig)

  defaultConfig.module.rules.push({
    test: [/\.stories\.js$/, /index\.js$/],
    loaders: [require.resolve('@storybook/addon-storysource/loader')],
    include: [path.resolve(__dirname, '../doc')],
    enforce: 'pre',
  });

  return defaultConfig;
};
