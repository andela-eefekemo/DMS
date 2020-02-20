const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

process.env.NODE_ENV = 'production';
const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production')
};

module.exports = {
  devtool: 'source-map',
  entry: `${__dirname}/client/index`,
  target: 'web',
  output: {
    path: `${__dirname}/client`,
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: `${__dirname}/client`
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include:
        `${__dirname}/client`,
        exclude: /(node_modules|bower_components)/,
        loaders: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: [
            'react-html-attrs',
            'transform-class-properties',
            'transform-decorators-legacy'
          ]
        }
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.(jpg|png|svg)$/, loader: 'url-loader' },
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin(GLOBALS),
    new webpack.NoEmitOnErrorsPlugin(),
    new MiniCssExtractPlugin({
      filename: './css/style.css',
      allChunks: true
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  node: {
    net: 'empty',
    dns: 'empty'
  }
};
