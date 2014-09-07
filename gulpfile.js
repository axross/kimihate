var fs         = require('fs');
var path       = require('path');
var gulp       = require('gulp');
var less       = require('gulp-less');
var browserify = require('gulp-browserify');
var plumber    = require('gulp-plumber');
var rename     = require('gulp-rename');
var autoprefix = require('gulp-autoprefixer');
var uglify     = require('gulp-uglify');
var notify     = require('gulp-notify');

gulp.task('less', function() {
  return gulp.src('./app/public/stylesheets/app.less')
    .pipe(plumber({
      errorHandler: notify.onError('lessのコンパイルでエラーが発生しました！\n<%= error.message %>')
    }))
    .pipe(less({ paths: [path.join(__dirname, 'less', 'includes')] }))
    .pipe(autoprefix())
    .pipe(rename('bundle.css'))
    .pipe(gulp.dest('./app/public/stylesheets/'))
    .pipe(notify('lessのコンパイルが完了しました'));
});

gulp.task('js', function() {
  return gulp.src('./app/public/javascripts/app.js')
    .pipe(plumber({
      errorHandler: notify.onError('Javascriptのコンパイルでエラーが発生しました！\n<%= error.message %>')
    }))
    .pipe(browserify({
      insertGlobals: true,
      debug: true
    }))
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('./app/public/javascripts/'))
    .pipe(notify('Javascriptのコンパイルが完了しました'));
});

gulp.task('uglify', function() {
  return gulp.src('./app/public/javascripts/bundle.js')
    .pipe(plumber({
      errorHandler: notify.onError('JavascriptのUglifyでエラーが発生しました！\n<%= error.message %>')
    }))
    .pipe(uglify())
    .pipe(gulp.dest('./app/public/javascripts/'))
    .pipe(notify('JavascriptのUglifyが完了しました'));
});

gulp.task('dev', ['less', 'js']);
gulp.task('pro', ['less', 'js', 'uglify']);

gulp.task('watch', ['less', 'js'], function() {
  gulp.watch('./app/public/stylesheets/**/*.less', ['less']);
  gulp.watch('./app/public/javascripts/**/*.js',   ['js']);
});

gulp.task('default', ['dev']);
