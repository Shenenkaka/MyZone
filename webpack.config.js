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
    filename: "./index.html",
    inject: true
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
    publicPath: '/'
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
  plugins: plugins,
  devServer: {
    contentBase: path.join(__dirname, "public"),
    publicPath: '/',
    stats: { colors: true },
    historyApiFallback: true,
    port: 7100,
    watchContentBase: true
  }
}
