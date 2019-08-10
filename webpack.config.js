const CopyPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  output: {
    filename: 'main.[chunkhash].js'
  },

  mode: 'production',

  // devtool: 'source-map',

  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },

  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader'
          }
        ]
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      // {
      //   enforce: 'pre',
      //   test: /\.js$/,
      //   loader: 'source-map-loader'
      // }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      minify: true,
      template: 'src/index.html'
    }),

    new CopyPlugin([
      { from: 'src/static', to: 'static' }
    ]),

    new ImageminPlugin({
      include: /\.jpg$/,
      name: '[path][hash]-compressed.[ext]',
      bail: false,
      cache: true,
      imageminOptions: {
        plugins: [
          ['mozjpeg', {
            quality: 50,
            progressive: true
          }]
        ]
      }
    })
  ]
};
