var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifycss = require('gulp-cssnano');
var inlinesource = require('gulp-inline-source');
var htmlmin = require('gulp-htmlmin');
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync')
    .create();
var paths = {
    styles: ['assets/css/*.css'],
    scripts: ['assets/js/*.js'],
    partials: ['assets/partials/*.html']
};
gulp.task('scripts', function() {
    return gulp.src([
            'assets/js/dialog-polyfill.js',
            'assets/js/Dexie.min.js',
            'assets/js/material.min.js',
            'assets/js/jquery.min.js',
            'assets/js/jquery.dataTables.min.js',
            'assets/js/jquery.srt.js',
            'assets/js/id3-minimized.js',
            'assets/js/filepicker.js',
            'assets/js/mp.network.js',
            'assets/js/mp.init.js',
            'assets/js/mp.db.js',
            'assets/js/mp.player.js',
            'assets/js/mp.storage.js',
            'assets/js/mp.settings.js',
            'assets/js/mp.playlist.js',
            'assets/js/mp.contextmenu.js',
            'assets/js/mp.hash.js',
            'assets/js/mp.customizer.js',
            'assets/js/mp.dialog.js',
            'assets/js/mp.drive.js',
            'assets/js/mp.dropbox.js',
            'assets/js/mp.youtube.js',
            'assets/js/mp.artwork.js',
            'assets/js/mp.log.js',
            'assets/js/mp.contextmenu.js',
        ])
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        .pipe(uglify())
        .on('error', swallowError)
        .pipe(concat('bundle.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('.'))
});
gulp.task('styles', function() {
    return gulp.src([
            'assets/css/animate.min.css',
            'assets/css/dialog-polyfill.css',
            'assets/css/visualizer.css',
            'assets/css/style.css',
        ])
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        .pipe(concat('bundle.css'))
        .pipe(autoprefixer({
            browsers: ['last 10 versions'],
            cascade: false
        }))
        .on('error', swallowError)
        .pipe(minifycss())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('.'))
        .pipe(browserSync.stream());
});
gulp.task('partials', function() {
    return gulp.src([
            'assets/partials/head.html',
            'assets/partials/header.html',
            'assets/partials/about.html',
            'assets/partials/library.html',
            'assets/partials/nowplaying.html',
            'assets/partials/playlist.html',
            'assets/partials/visualizer.html',
            'assets/partials/youtube.html',
            'assets/partials/hidden.html',
            'assets/partials/footer.html',
        ])
        .pipe(concat('index.html'))
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('.'));
});
gulp.task('watch', function() {
    browserSync.init({
        proxy: "localhost/materialplayer",
        online: true
    });
    gulp.watch(paths.styles, ['styles']);
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.partials, ['partials']);
    gulp.watch(['index.html', 'bundle.js'])
        .on('change', browserSync.reload);
});
gulp.task('default', ['scripts', 'styles', 'partials', 'watch']);

function swallowError(error) {
    console.log(error.toString());
    this.emit('end');
}
