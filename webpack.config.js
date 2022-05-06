const { resolve, join } = require('path')
const ESLintPlugin = require('eslint-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: '[name].bundle.js',
    path: resolve(__dirname, 'dist')
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader'
      ]
    }, {
      test: /\.(png|svg|jpg|gif)$/,
      use: [
        'file-loader'
      ]
    }]
  },
  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: join(__dirname, 'dist')
    },
    compress: true,
    port: 9000,
    hot: true
  },
  optimization: {
    moduleIds: 'named'
  },
  plugins: [
    new ESLintPlugin({
      extensions: ['js'],
      context: resolve('src'),
      exclude: '/node_modules'
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'pixjs demo',
      template: 'public/index.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}
