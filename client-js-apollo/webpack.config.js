const webpack = require('webpack')

const DEV_PORT = 3001

module.exports = {
  target: 'web',
  mode: 'development',
  devtool: 'inline-source-map',
  entry: [
    `webpack-dev-server/client?http://localhost:${DEV_PORT}`,
    'webpack/hot/only-dev-server',
    './src/bootstrap'
  ],
  output: {
    filename: 'client.js',
    path: __dirname,
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js/,
        use: {
          loader: 'babel-loader'
        },
        exclude: /node_modules/
      },
      {
        test: /\.graphql/,
        loader: 'graphql-tag/loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    host: 'localhost',
    port: DEV_PORT,
    historyApiFallback: true,
    hot: true
  }
}
