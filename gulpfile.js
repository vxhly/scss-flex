/**
 * 引入 gulp
 */
const gulp = require('gulp') // 基础库

/**
 * 版本信息
 */
const pkg = require('./package.json')
const gulpSequence = require('gulp-sequence')

/**
 * gulp 模块化管理工具
 */
const gulpLoadPlugins = require('gulp-load-plugins') // 模块化管理
const $ = gulpLoadPlugins() // 定义变量

const scssSrc = './src/*.scss'

const banner = ['/*!',
' * <%= pkg.name %> - <%= pkg.description %>',
' * ',
' * @version v<%= pkg.version %>',
' * ',
' * @author <%= pkg.author %>',
' * ',
' * @link <%= pkg.homepage %>',
' * @license <%= pkg.license %>',
' */',
  ''].join('\n')

gulp.task('build', function () {
  return gulp.src(scssSrc)
    .pipe($.sass.sync()
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      cascade: false
    }))
    .pipe($.csscomb())
    .pipe($.cssbeautify({
      indent: '  ',
      openbrace: 'end-of-line',
      autosemicolon: true
    }))
    .pipe($.header(
      banner, {
        pkg: pkg
      }
    ))
    .pipe(gulp.dest('./dist'))
    .pipe($.sourcemaps.init())
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest('./dist'))
})
  