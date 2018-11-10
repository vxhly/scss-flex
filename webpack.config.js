const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const autoprefixer = require('autoprefixer')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
  entry: path.join(__dirname, './src/scss-flex.scss'),
  output: {
    path: path.join(__dirname, './dist')
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  module: {
    rules: [{
      // 增加对 SCSS 文件的支持
      test: /\.(css|sass|scss)$/,
      // SCSS 文件的处理顺序为先 sass-loader 再 css-loader 再 style-loader
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            importLoaders: 2
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            plugins: () => [
              autoprefixer({
                browsers: [
                  'ie >= 8',
                  'ie_mob >= 10',
                  'ff >= 26',
                  'chrome >= 20',
                  'safari >= 6',
                  'opera >= 12',
                  'Firefox >= 24',
                  'Explorer >= 8',
                  'ios >= 5',
                  'android >= 2.3',
                  'bb >= 10',
                  'last 1 version'
                ]
              })
            ]
          }
        },
        {
          loader: 'sass-loader'
        }
      ]
    }]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new MiniCssExtractPlugin({
      filename: 'scss-flex.css'
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: {
        safe: true,
        discardComments: {
          removeAll: true
        }
      },
      canPrint: true
    })
  ]
}