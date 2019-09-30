'use strict'

const Webpack = require('webpack')
const Path = require('path')

module.exports = {
  mode: 'production',
  entry: Path.join(__dirname, '..', 'src', 'background.js'),
  output: {
    path: Path.join(__dirname, '..', 'dist'),
    filename: 'background.bundle.js'
  },
  plugins: [
    new Webpack.DefinePlugin({
      'process.env.CHATTERBOX_RELAY_ADDRS': JSON.stringify(process.env.CHATTERBOX_RELAY_ADDRS),
    })
  ],
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }]
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
}
