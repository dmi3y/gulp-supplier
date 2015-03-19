'use strict';

var
	gulp = require('gulp'),
	supply = require('./index.js');
	// concat = require('gulp-concat'),
	//rename = require('gulp-rename');

gulp.task('test-build', function() {
        gulp.src([
            'test/src/common.js' // picking up common file(s)
        ])
        // .pipe(concat('commons.js')) // concats all supplements
        .pipe(supply('./test/src/*-specific.js')) // injecting it into every specific file
        /*.pipe(rename({
            suffix: "-build" // changing build's name, when it's necessarily
        }))*/
        .pipe(gulp.dest("./test/build")); // outputs specefic builds with common functionality supplied
});