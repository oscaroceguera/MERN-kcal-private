const merge = require('webpack-merge')
const common = require('./webpack.common')
const BundleAnalizerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    //& historyApiFallback: true
  },
  plugins: [
    new BundleAnalizerPlugin(),
    // new MiniCssExtractPlugin({
    //   filename: "[name].css"
    // })
  ]
})