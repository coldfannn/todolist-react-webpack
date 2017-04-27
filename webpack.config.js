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
    publicPath:'/',
    port: '9000'
  },
  resolve: {
    extensions: ['.js', '.coffee', '.tsx', '.ts', '.html']
  },
  module: {
    rules: [
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
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader"
        }, {
          loader: "less-loader"
        }]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
};