/**
 * @Date:   2017-03-25 12:10:17 pm
 * @Email:  pengchengou@gmail.com
 * @Project: BIGBIGADS TECHNOLOGY LIMITED
 * @Filename: gulpfile.js
 * @Last modified time: 2017-12-16 02:26:47 pm
 * @License: MIT
 * @Copyright: BIGBIGADS TECHNOLOGY LIMITED
 */

/**
 * 引入 gulp
 */
var gulp = require('gulp'); // 基础库

/**
 * gulp 模块化管理工具
 */
var gulpLoadPlugins = require('gulp-load-plugins'); // 模块化管理
var $ = gulpLoadPlugins(); // 定义变量

var scssSrc = './src/*.scss';


gulp.task('default', function () {
  return gulp.src(scssSrc)
    .pipe($.sass({
        outputStyle: 'compressed'
      })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: [
        'ie >= 8',
        'ie_mob >= 10',
        'ff >= 26',
        'chrome >= 30',
        'safari >= 6',
        'opera >= 23',
        'ios >= 5',
        'android >= 2.3',
        'bb >= 10'
      ]
    }))
    .pipe($.csscomb())
    .pipe($.cssbeautify({
      indent: '  ',
      openbrace: 'end-of-line',
      autosemicolon: true
    }))
    .pipe(gulp.dest('./dist'))
    .pipe($.rename({
      suffix: '.min'
    }))
    .pipe($.cleanCss({
      debug: true,
      compatibility: 'ie8'
    }))
    .pipe(gulp.dest('./dist'))
});
