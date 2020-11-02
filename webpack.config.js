const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'modelbox-sdk.js'
  },
  devServer:{
    // 配置webpack-dev-server的www目录
    contentBase:'./dist',
    compress: true,
    port: 9000
  },
  module: {
    rules: [
      {
        test:/\.js$/,
        exclude:/(node_modules|bower_components)/,//排除掉node_module目录
        use:{
          loader:'babel-loader',
        }
      }
    ]
  },
  // optimization: {
  //   minimizer: [new UglifyJsPlugin()],
  // },
  // mode: "production",
  mode: "development"
};
