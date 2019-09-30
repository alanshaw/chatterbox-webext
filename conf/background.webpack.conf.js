'use strict'

const Path = require('path')

module.exports = {
  mode: 'production',
  entry: Path.join(__dirname, '..', 'src', 'background.js'),
  output: {
    path: Path.join(__dirname, '..', 'dist'),
    filename: 'background.bundle.js'
  },
  plugins: [],
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
