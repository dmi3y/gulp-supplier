		gulp.task('build', function() {
		    gulp.src([
		        'common-library.js' // picking up common file(s)
		    ])
		        .pipe(build('./src/*-specific.js')) // injecting it into every specific file
		        .pipe(rename({
			        suffix: "-build" // changing build name
			    }))
			    .pipe(gulp.dest("./build")); // outputs for npm and bower