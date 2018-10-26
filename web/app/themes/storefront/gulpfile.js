'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var concatCss = require('gulp-concat-css');
var uglify = require('gulp-uglify');
var pump = require('pump');
var babel = require('gulp-babel');
var through = require('through2');

var CONFIG = {
    cssDir: './assets/css',
    jsDir: './assets/js',
    cssFiles: [
        './gulp-assets/scss/*.scss'
    ],
    jsFiles: [
        './gulp-assets/js/*.js'
    ]
};

gulp.task('default', ['style', 'js', 'watch']);

// Build css
gulp.task('style', function () {
    return gulp.src(CONFIG.cssFiles)
        .pipe(concatCss("styles.css"))
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(gulp.dest(CONFIG.cssDir));
});

// Build js
gulp.task('js', function () {
    return gulp.src(CONFIG.jsFiles)
        .pipe(concat('scripts.js'))
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest(CONFIG.jsDir));
});

// Watch
gulp.task('watch', function () {
    gulp.watch(CONFIG.cssFiles, ['style']);
    gulp.watch(CONFIG.jsFiles, ['js']);
});

// Min
gulp.task('build', function (cb) {
    pump([
        gulp.src(CONFIG.jsDir + '/scripts.js'),
        uglify(),
        gulp.dest(CONFIG.jsDir)
    ],
        cb
    );
});