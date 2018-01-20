/**
 * @Author: vxhly
 * @Date:   2017-03-25 12:10:17 pm
 * @Email:  pengchengou@gmail.com
 * @Last modified by:   vxhly
 * @Last modified time: 2018-01-20 09:52:37 pm
 * @License: MIT
 */

/**
 * 引入 gulp
 */
var gulp = require('gulp'); // 基础库

/**
 * 版本信息
 */
var pkg = require('./package.json');
var gulpSequence = require('gulp-sequence')

/**
 * gulp 模块化管理工具
 */
var gulpLoadPlugins = require('gulp-load-plugins'); // 模块化管理
var $ = gulpLoadPlugins(); // 定义变量

var scssSrc = './src/*.scss';

var banner = ['/*!',
' * <%= pkg.name %> - <%= pkg.description %>',
' * ',
' * @version v<%= pkg.version %>',
' * ',
' * @author <%= pkg.author %>',
' * ',
' * @link <%= pkg.homepage %>',
' * @license <%= pkg.license %>',
' */',
''].join('\n');

gulp.task('dev', function () {
  return gulp.src(scssSrc)
    .pipe($.sass.sync()
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
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
    .pipe($.rename({
      suffix: '.min'
    }))
    .pipe($.sourcemaps.init())
    .pipe($.cssnano())
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest('./dist'))
});


/**
 * type，可接受的值包括下面四个，倘若现在的版本号为1.2.3，则对应的新版本号为：
 * prerelease：1.2.3-0
 * patch：1.2.4
 * minor：1.3.0
 * major：2.0.0
 */
gulp.task('bump:patch', function () {
  return gulp.src(['./package.json', './bower.json'])
    .pipe($.bump({
      type: 'patch'
    }))
    .pipe(gulp.dest('./'))
});
gulp.task('bump:prerelease', function () {
  return gulp.src(['./package.json', './bower.json'])
    .pipe($.bump({
      type: 'prerelease'
    }))
    .pipe(gulp.dest('./'))
});
gulp.task('bump:minor', function () {
  return gulp.src(['./package.json', './bower.json'])
    .pipe($.bump({
      type: 'minor'
    }))
    .pipe(gulp.dest('./'))
});
gulp.task('bump:major', function () {
  return gulp.src(['./package.json', './bower.json'])
    .pipe($.bump({
      type: 'major'
    }))
    .pipe(gulp.dest('./'))
});

gulp.task('watch', function () {
  gulp.watch(scssSrc, ['dev']);
})
