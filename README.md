## Gulp Supplier

> Supply varios dependencies per different builds in easy way.

## Explanation

Let's assume you have following files into the project:

- common-library.js
- node-specific.js
- browser-specific.js

And what you want is to build `npm` and `bower` build files.
That's where supplier could get handy, so the build task will look like.

		...
		gulp.task('build', function() {
		    gulp.src([
		        'common-library.js' // picking up common file(s)
		    ])
		        .pipe(build('./src/*-specific.js')) // injecting it into every specific file
		        .pipe(rename({
			        suffix: "-build" // changing build name
			    }))
			    .pipe(gulp.dest("./build")); // outputs for npm and bower
		...



