// webpack dev
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const plugins = [
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: Infinity,
    filename: 'vendor.bundle.js'
  }),
  new HtmlWebpackPlugin({
    template: path.join(__dirname, './views/index.ejs'),
    filename: '/index.ejs',
    inject: true
  }),
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      drop_console: true,
      screw_ie8: true,
      conditionals: true,
      unused: true,
      comparisons: true,
      sequences: true,
      dead_code: true,
      evaluate: true,
      if_return: true,
      join_vars: true,
    },
    output: {
      comments: false
    },
  })
]

module.exports = {
  entry: {
    app: './client/javascripts/app.js',
    vendor: ['react', 'react-dom']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/dist/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-0']
        }
      }, {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[path][name].[ext]&context=./public'
        ]
      }, {
        test: /\.less$/,
        loaders: ['style-loader', 'css-loader', 'less-loader'],
      }
    ]
  },
  plugins: plugins
}
