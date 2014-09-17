var path       = require('path');
var gulp       = require('gulp');
var rename     = require('gulp-rename');
var plumber    = require('gulp-plumber');
var notify     = require('gulp-notify');
var less       = require('gulp-less');
var autoprefix = require('gulp-autoprefixer');
var csso       = require('gulp-csso');
var browserify = require('gulp-browserify');
var uglify     = require('gulp-uglify');

var sources = {
  js: {
    in:    './app/public/javascripts/app.js',
    out:   './app/public/javascripts/bundle.js',
    watch: './app/public/javascripts/**/*.js',
    message: {
      error:   'jsのコンパイルでエラーが発生しました！\n<%= error.message %>',
      success: 'jsのコンパイルが完了しました'
    }
  },
  css: {
    in:    './app/public/stylesheets/app.less',
    out:   './app/public/stylesheets/bundle.css',
    watch: './app/public/stylesheets/**/*.less',
    message: {
      error:   'lessのコンパイルでエラーが発生しました！\n<%= error.message %>',
      success: 'lessのコンパイルが完了しました'
    }
  }
};

gulp.task('css', function() {
  return gulp.src(sources.css.in)
    .pipe(plumber({
      errorHandler: notify.onError(sources.css.message.error)
    }))
    .pipe(less({ paths: [path.join(__dirname, 'less', 'includes')] }))
    .pipe(autoprefix())
    .pipe(rename(path.basename(sources.css.out)))
    .pipe(gulp.dest(path.dirname(sources.css.out)))
    .pipe(notify(sources.css.message.success));
});

gulp.task('css-pro', function() {
  return gulp.src(sources.css.out)
    .pipe(plumber({
      errorHandler: notify.onError(sources.css.message.error)
    }))
    .pipe(csso())
    .pipe(gulp.dest(path.dirname(sources.css.out)))
    .pipe(notify(sources.css.message.success));
});

gulp.task('js', function() {
  return gulp.src(sources.js.in)
    .pipe(plumber({
      errorHandler: notify.onError(sources.js.message.error)
    }))
    .pipe(browserify({
      insertGlobals: true,
      debug: true
    }))
    .pipe(rename(path.basename(sources.js.out)))
    .pipe(gulp.dest(path.dirname(sources.js.out)))
    .pipe(notify(sources.js.message.success));
});

gulp.task('js-pro', function() {
  return gulp.src(sources.js.out)
    .pipe(plumber({
      errorHandler: notify.onError(sources.js.message.error)
    }))
    .pipe(uglify())
    .pipe(gulp.dest(path.dirname(sources.js.out)))
    .pipe(notify(sources.js.message.success));
});

gulp.task('default', ['css', 'js']);
gulp.task('build', ['css', 'js', 'css-pro', 'js-pro']);

gulp.task('watch', ['dev'], function() {
  gulp.watch(sources.css.watch, ['css']);
  gulp.watch(sources.js.watch,  ['js']);
});
