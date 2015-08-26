var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var saveLicense = require('uglify-save-license');

gulp.task('default', function() {
  return gulp.src('source/*.js')
    .pipe(rename({extname: '.jquery.js'}))
    .pipe(sourcemaps.init())
    .pipe(gulp.dest('compiled'))
    .pipe(uglify({preserveComments: saveLicense}))
    .pipe(rename({extname: '.min.js'}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('compiled'))
});
