const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const { join } = require('path')
module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: join(__dirname, 'dist')
    },
    compress: true,
    port: 9000,
    hot: true
  }
})
