var gulp = require('gulp');
var concat = require('gulp-concat');
var fs = require('fs');
var uglify = require('gulp-uglify');
var minifycss = require('gulp-cssnano');
var inlinesource = require('gulp-inline-source');
var htmlmin = require('gulp-htmlmin');
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
// var browserSync = require('browser-sync')
// .create();
var paths = {
    styles: ['assets/css/*.css'],
    scripts: ['assets/js/*.js'],
    partials: ['assets/partials/*.html']
};
var scripts = JSON.parse(fs.readFileSync('scripts.json', 'utf8'));
var styles = JSON.parse(fs.readFileSync('styles.json', 'utf8'));
var partials = JSON.parse(fs.readFileSync('partials.json', 'utf8'));
gulp.task('scripts', function() {
    return gulp.src(scripts)
        .pipe(sourcemaps.init())
        .on('error', swallowError)
        .pipe(sourcemaps.write())
        .pipe(sourcemaps.init())
        .pipe(concat('bundle.js'))
        .pipe(sourcemaps.write())
        // .pipe(sourcemaps.init())
        // .pipe(uglify())
        // .pipe(sourcemaps.write())
        .pipe(gulp.dest('.'))
});
gulp.task('styles', function() {
    return gulp.src(styles)
        .pipe(sourcemaps.init())
        .pipe(concat('bundle.css'))
        .pipe(sourcemaps.write())
        .pipe(sourcemaps.init())
        .pipe(autoprefixer({
            browsers: ['last 10 versions'],
            cascade: false
        }))
        .on('error', swallowError)
        .pipe(sourcemaps.write())
        // .pipe(sourcemaps.init())
        // .pipe(minifycss())
        // .pipe(sourcemaps.write())
        .pipe(gulp.dest('.'))
        // .pipe(browserSync.stream());
});
gulp.task('partials', function() {
    return gulp.src(partials)
        .pipe(concat('index.html'))
        // .pipe(htmlmin({
        //     collapseWhitespace: true
        // }))
        .pipe(gulp.dest('.'));
});
gulp.task('watch', function() {
    // browserSync.init({
    //     proxy: "localhost/materialplayer",
    //     online: true
    // });
    gulp.watch(paths.styles, ['styles']);
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.partials, ['partials']);
    gulp.watch(['index.html', 'bundle.js'])
        // .on('change', browserSync.reload);
});
gulp.task('default', ['scripts', 'styles', 'partials', 'watch']);

function swallowError(error) {
    console.log(error.toString());
    this.emit('end');
}
