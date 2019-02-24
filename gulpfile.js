const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const concat = require('gulp-concat');

const paths = {
  dirs: {
    build: './build',
    src: './src'
  },
  html: './src/*.html',
  sass: './src/scss/style.scss',
  allSass: './src/scss/**/*.scss',
  allJs: './src/js/**/*.js',
  jsIndex: './src/js/index.js',
  jsService: './src/js/services.js',
  jsController: './src/js/controllers.js',
  jsFilter: './src/js/filters.js',
  jsMain: './dist/main.js'
};

gulp.task('html', function() {
  return gulp.src(paths.html)
    .pipe(gulp.dest(paths.dirs.build))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('sass', function() {
  return gulp.src(paths.sass)
    .pipe(sass())
    .pipe(gulp.dest(paths.dirs.build))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('js', function() {
  return gulp.src(
    [
      paths.jsIndex,
      paths.jsService,
      paths.jsFilter,
      paths.jsController
    ])
    .pipe(concat('main.js'))
    .pipe(gulp.dest(paths.dirs.build))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('watch', function() {
  gulp.watch(paths.html).on('change', gulp.series('html'));
  gulp.watch(paths.allSass).on('change', gulp.series('sass'));
  gulp.watch(paths.allJs).on('change', gulp.series('js'));
});

gulp.task('serve', function(done) {
  browserSync({
    server: {
      baseDir: paths.dirs.build
    },
    port: 8080,
    notify: false,
    open: true
  });
  done();
});

gulp.task('default', gulp.parallel('serve', 'watch'));

gulp.task('build', gulp.parallel('html', 'sass', 'js'));