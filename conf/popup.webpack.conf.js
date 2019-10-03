'use strict'

const Path = require('path')

module.exports = {
  mode: 'production',
  entry: Path.join(__dirname, '..', 'src', 'popup/index.js'),
  output: {
    path: Path.join(__dirname, '..', 'dist'),
    filename: 'popup.bundle.js'
  },
  plugins: [],
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
          plugins: ['@babel/plugin-proposal-class-properties']
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
