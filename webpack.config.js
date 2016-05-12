var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');

module.exports = {
  context: __dirname + "/public",
  devtool: debug ? "inline-sourcemap" : null,
  entry: "./scripts/main.js",
  output: {
    path: __dirname + "/public/scripts/",
    filename: "main.min.js"
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false}),
  ],
  resolve: {
    root: [
        path.join(__dirname, "..", "gulp", "node_modules"),
        path.join(__dirname, "..", "scripts", "modules"),
    ],
    extensions: ['', '.js', '.json'] 
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
        }
      }
    ]
  },
};
