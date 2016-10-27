var webpack = require('webpack')
var path = require('path')

module.exports = {
  entry: [
    './master/jsx/index.jsx'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: 'dist/',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css', '.less']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel']
      }, {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel']
      }, {
        test: /\.css$/,
        loader: 'style!css'
      }, {
        test: /\.less$/,
        loader: 'style!css!less'
      }, {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.NoErrorsPlugin()
  ]
}
