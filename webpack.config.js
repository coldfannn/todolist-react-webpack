var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: [
    './common.ts',
    'react-hot-loader/patch',
    'webpack/hot/only-dev-server',
    path.resolve(__dirname, 'src/index.jsx'),
  ],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'build'),
    hot: true,
    publicPath:'/'
  },
  resolve: {
    extensions: ['.js', '.coffee', '.tsx', '.ts', '.html']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015','react'],
          plugins: "react-hot-loader/babel"
        }
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loaders: ['awesome-typescript-loader', 'tslint-loader']
      },
      {
        test: /\.less$/,
        loader: "style!css!less"
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
};