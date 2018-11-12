const path = require('path')
// 拆分 css 出来单独打包
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
// 添加不同浏览器的兼容
const autoprefixer = require('autoprefixer')
// 打包之前清掉原打包信息
const CleanWebpackPlugin = require('clean-webpack-plugin')
// 结合 postcss 来解决不同浏览器的兼容
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
// 删除没必要的文件
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries")

module.exports = {
  entry: path.join(__dirname, './src/scss-flex.scss'),
  output: {
    path: path.join(__dirname, './dist')
  },
  module: {
    rules: [{
      // 增加对 SCSS 文件的支持
      test: /\.(css|sass|scss)$/,
      exclude: /node_modules/,
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
    new FixStyleOnlyEntriesPlugin(),
    new MiniCssExtractPlugin({
      filename: 'scss-flex.min.css'
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