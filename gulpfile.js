'use strict';

var
    gulp = require('gulp'),
    mocha = require('gulp-mocha'),
    clean = require('gulp-clean'),
    sequence = require('gulp-run-sequence'),
    supply = require('./index.js');
// concat = require('gulp-concat'),
//rename = require('gulp-rename');

/**
 *	Build test dependencies
 */
gulp.task('test-build', function() {
    return gulp.src([
            'test/src/common.js' // picking up common file(s)
        ])
        // .pipe(concat('commons.js')) // concats all supplements
        .pipe(supply('./test/src/*-specific.js')) // injecting it into every specific file
        /*.pipe(rename({
            suffix: '-build' // changing build's name, when it's necessarily
        }))*/
        .pipe(gulp.dest('./test/build')); // outputs specefic builds with common functionality supplied
});

/**
 *	Cleanup test builds
 */
gulp.task('clean', function() {
    return gulp.src('./test/build')
        .pipe(clean());
});

/**
 *	Test runner
 */
gulp.task('test', ['test-build'], function() {
    return gulp.src('./test/*-test.js', {
            read: false
        })
        .pipe(mocha({
            reporter: 'nyan'
        }));
});

/**
 *	Default task
 */
gulp.task('default', function(cb) {
    sequence(
    	'clean',
    	'test',
    	'clean',
        cb);
});
