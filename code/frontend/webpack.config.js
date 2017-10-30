var webpack = require('webpack');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
require('babel-polyfill');

module.exports = (env) => {
  var isDev = typeof env !== 'undefined' && typeof env.dev !== 'undefined' && env.dev;
  return {
    devtool: isDev ? 'source-map' : 'eval',
    entry: ['babel-polyfill', './index.js'],
    output: {
      path: __dirname + '/dist',
      filename: 'bundle.js'
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          query: {
            presets: ['es2015', 'react'],
            plugins: ['babel-plugin-transform-object-assign']
          }
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          loader: 'style-loader'
        },
        {
          test: /\.css$/,
          loader: 'css-loader',
          exclude: /node_modules/,
          query: {
            modules: true,
            localIdentName: '[name]__[local]___[hash:base64:5]'
          }
        },
        {
          test: /\.json$/,
          loader: 'json-loader'
        }
      ]
    },
    plugins: isDev ? [] : [
      new CleanWebpackPlugin(['dist']),
      new UglifyJSPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      })
    ]
  };
};
