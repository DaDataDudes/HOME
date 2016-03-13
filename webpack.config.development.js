/* eslint strict: 0 */
'use strict';

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack.config.base');
const config = Object.create(baseConfig);

config.debug = true;

config.devtool = 'cheap-module-eval-source-map';

config.entry = './src/index';

config.output.publicPath = '/';

config.devServer = {
  hot: true,
  inline: true,
  progress: true,
  contentBase: './dist',
  stats: { colors: true },
};

config.module.loaders.push({
  test: /\.global\.css$/,
  loaders: [
    'style-loader',
    'css-loader?sourceMap',
    'postcss-loader',
  ],
}, {
  test: /^((?!\.global).)*\.css$/,
  loaders: [
    'style-loader',
    'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
    'postcss-loader',
  ],
});

config.postcss = function postcss() {
  return [
    require('postcss-modules-values'),
    require('postcss-nested'),
    require('postcss-import'),
    require('rucksack-css'),
  ];
};

config.plugins.push(
  new webpack.HotModuleReplacementPlugin(),
  new HtmlWebpackPlugin({
    template: 'src/index.html',
    inject: true,
  }),
  new webpack.NoErrorsPlugin(),
  new webpack.DefinePlugin({
    '__DEV__': true,
    'process.env': {
      'NODE_ENV': JSON.stringify('development'),
    },
  })
);

module.exports = config;
