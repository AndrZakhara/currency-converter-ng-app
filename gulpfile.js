const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const concat = require('gulp-concat');

const paths = {
  dirs: {
    build: './build',
    templates: './build/templates',
    src: './src'
  },
  html: './src/*.html',
  htmlTemlates: './src/templates/*.html',
  sass: './src/scss/style.scss',
  allSass: './src/scss/**/*.scss',
  allJs: './src/js/**/*.js'
};

gulp.task('htmlMain', function() {
  return gulp.src(paths.html)
    .pipe(gulp.dest(paths.dirs.build))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('htmlTemplates', function() {
  return gulp.src(paths.htmlTemlates)
    .pipe(gulp.dest(paths.dirs.templates))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('html', gulp.parallel('htmlMain', 'htmlTemplates'));

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
      paths.allJs
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

gulp.task('build', gulp.parallel('html', 'sass', 'js'));

gulp.task('default', gulp.series('build', 'serve', 'watch'));