import config from './webpack.config.js';

module.exports = {
  ...config,
  devServer:{
    // 配置webpack-dev-server的www目录
    contentBase:'./dist',
    compress: true,
    port: 9000
  },
  mode: "development"
};
