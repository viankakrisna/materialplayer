var concat = require('gulp-concat');

gulp.task('uglify', function() {
    return gulp.src('./assets/js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist/'));
});
