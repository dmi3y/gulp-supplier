## Gulp Supplier

> Supply varios dependencies per different builds in easy way.

## Explanation

Let's assume you have following files into the project:

- common-library.js
- node-specific.js
- browser-specific.js

And what you want is to create `npm` and `bower` build files.
That's where supplier could get handy, so the build task may look like.

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
		});
		...


This is a schema of what happening:

                     common-library.js
                        (streaming)
                            |
                            |
           ----------------------------------------
           | supplier takes all the files,        |
           | and forks common library as separate |
           | stream per every file.               |
           ----------------------------------------
           		|                           |
   		common-library.js +           common-library.js +
   		node-specefic.js              browser-specific.js
   				|                           |
   		    (streaming)                 (streaming)
   		      .....						  .....


Every 'forked' File stream inherits `filepath` attribute (name) from its specefic file.
In the output, common stream comes first, specefic stream comes second.

## Releases

1.0.0 (3/21/15) - First release.

## License

MIT