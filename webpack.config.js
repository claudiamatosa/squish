const CopyPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack');

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
    new CopyPlugin([
      { from: 'src/static', to: 'static' }
    ]),

    new ImageminPlugin({
      name: '[path][hash]-compressed.[ext]',
      bail: false,
      cache: true,
      imageminOptions: {
        plugins: [
          ['mozjpeg', {
            quality: 60,
            progressive: true
          }]
        ]
      }
    })
  ]
};
