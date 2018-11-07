const resolve = require('path').resolve;
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (options = {}) => ({
  entry: {
    index: './src/main.js'
  },
  output: {
    path: resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: ['vue-style-loader', {
              loader: 'css-loader',
            }],
            js: [
              'babel-loader',
            ],
            query: {
              presets: ['es2015'],
            }
          }
        },
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: ["stage-0"]
        },
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|otf|svg|svgz)(\?.+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 64
          }
        }]
      }
    ]
  },
  resolve: {
    alias: {
      '~': resolve(__dirname, 'src')
    },
    extensions: ['.js', '.vue', '.css']
  },
  devServer: {
    host: '0.0.0.0',
    port: 8040,
    open: true,
    historyApiFallback: true,
    contentBase: resolve('./src/assets'),
    // Reload for code changes to static assets.
    watchContentBase: true
  },
  devtool: options.dev ? '#eval-source-map' : '#source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
});
