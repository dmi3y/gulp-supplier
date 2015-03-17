"use strict";
var
    through = require('through2'),
    fs = require('fs'),
    glob = require('glob'),
    File = require('vinyl');

function supply(adds) {

  var stream = through.obj(function(file, enc, cb) {
  	var
  		stream = this,
        contents = file.contents;

	glob(adds, function(err, files) {
	    var
	        flen,
	        cbc;

	    function writeStream() {

	    	return function (err, add) {
	    		var
	    			nfile,
	    			ncontents;

	        	if ( !err ) {
	        		ncontents = Buffer.concat([contents, add]);
	        		nfile = new File({
	        			cwd: file.cwd,
	        			base: file.base,
	        			path: file.path,
	        			contents: ncontents
	        		});
		     		stream.push(nfile);
		     		cbc();
	        	}
        	};
        }

	    if (!err) {

	        flen = files.length;

	        cbc = (function() {
	        	var
	        		i = flen;

	        	return function() {

	        		i -= 1;
	        		if ( i === 0 ) {
	        			cb();
	        		}
	        	};
	        }());

	        for (; flen--;) {

	            fs.readFile(files[flen], writeStream());
	        }
	    }
	});
  });

  return stream;
}

module.exports = supply;
