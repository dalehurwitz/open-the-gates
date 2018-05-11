var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var rename = require('gulp-rename')
var sourcemaps = require('gulp-sourcemaps')
var uglify = require('gulp-uglify')
var sass = require('gulp-sass')
var browserify = require('browserify')
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var log = require('gulplog')
var babelify = require('babelify')

// process JS entry file
gulp.task('js', function () {
  var b = browserify({
    entries: './src/index.js',
    debug: true
  }).transform("babelify", {presets: ['env']})

  return b.bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .on('error', log.error)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist'));
});

// create a task that ensures the `js` task is complete before
// reloading browsers
gulp.task('js-watch', ['js'], function (done) {
  browserSync.reload();
  done();
});

gulp.task('sass', function() {
  return gulp.src("src/index.scss")
    .pipe(sass())
    .pipe(rename('styles.css'))
    .pipe(gulp.dest("./dist"))
    .pipe(browserSync.stream());
});

// use default task to launch Browsersync and watch JS files
gulp.task('default', ['js', 'sass'], function () {
  // Serve files from the root of this project
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });

  // add browserSync.reload to the tasks array to make
  // all browsers reload after tasks are complete.
  gulp.watch("src/*.js", ['js-watch']);
  gulp.watch("src/*.scss", ['sass']);
  gulp.watch("*.html").on("change", browserSync.reload);
});