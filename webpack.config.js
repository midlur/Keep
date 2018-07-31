const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');

const extractPlugin = new ExtractTextPlugin({
  filename: 'main.css',
});

module.exports = {
  entry: [
    './public/js/index.js',
    
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      //      {
      //        enforce: 'pre',
      //        test: /\.js?$/,
      //        exclude: [/node_modules/, /vendors/],
      //        loader: 'eslint-loader',
      //        options: {
      //          fix: true,
      //        },

      {
        test: /\.js?$/,
        exclude: [/node_modules/, /vendors/],
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['env', 'stage-0'],
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: extractPlugin.extract({
          use: ['css-loader?url=false', 'sass-loader'],
        }),
      },
      {
        test: /\.css$/,
        use: extractPlugin.extract({
          use: ['style-loader','css-loader'],
        }),
      },
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
      // Font-awesome 4.7.X
      {
        test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        exclude: [/vendors/, /img/],
        loader: 'file-loader?name=fonts/[name].[ext]',
      },
      // MDB
      {
        test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        exclude: [/node_modules/, /img/],
        loader: 'file-loader?name=font/roboto/[name].[ext]',
      },
      {
        test: /\.(png|jpg|gif|svg|jpeg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          useRelativePath: true,
        },
      },
    ],
  },
  plugins: [
    extractPlugin,
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.$': 'jquery',
      'window.jQuery': 'jquery',
      Waves: 'node-waves',
    }),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    }),
    // new CopyWebpackPlugin([{ from: 'src/vendors/mdb/mdb-addons', to: 'mdb-addons' }]),
    new CleanWebpackPlugin(['dist']),
  ],
  devtool: 'source-map',
  target: 'web',
};