/*eslint-disable no-unused-vars*/
const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './src/index.jsx',
  
  module: {
    loaders: [
      {
        test: /\.js|.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['react', 'es2015']
        }
      },
      { 
        test: /\.css$/,
        loaders: ['style-loader','css-loader'] 
      },
      { 
        test: /\.(jpg|png|svg|jpeg)$/,
        loader: 'file-loader' 
      },
    ]
  },
  target: 'web',
  resolve: {
    extensions: ['.js', '.jsx']
  },
  output: {
    path: path.resolve(__dirname +'/dist'),
    filename: 'bundle.js'
  },

};