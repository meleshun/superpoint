'use strict';

const gulp = require('gulp'),
      sass = require('gulp-sass'),
      autoprefixer  = require('gulp-autoprefixer'),
      browserSync = require('browser-sync').create();


// Compile sass files into CSS
gulp.task('sass', function () {
  return gulp.src('app/sass/*.sass')
    .pipe(sass({
      includePaths: ['app/sass'],
      errLogToConsole: true,
      outputStyle: 'compressed',
      onError: browserSync.notify
    }))
    .pipe(autoprefixer(['last 2 versions', '> 1%', 'IE 11'], { cascade: true }))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.stream());
});

// Serve and watch sass/html files for changes
gulp.task('watch', function () {
  browserSync.init({
      server: 'app',
      notify: false
  }),

  gulp.watch('app/sass/*.sass', gulp.series('sass'));
  gulp.watch('app/*.html').on('change', browserSync.reload);
});

gulp.task('default', gulp.parallel('sass', 'watch'));