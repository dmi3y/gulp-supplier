'use strict';

var
	fs = require('fs'),
	assert = require('assert');

describe('build', function() {
    it('should generate two files', function(done) {

    	fs.readdir('./test/build', function(err, list) {
    		assert.equal(list.length, 2);
    		done();
    	});
    });
    it('should contain common and a-specific', function(done) {

    	fs.readFile('./test/build/a-specific.js', function(err, file) {
    		var
    			farr = file.toString().split('\n');

    		assert.equal(farr[0], '// common');
    		assert.equal(farr[1], '// a-specific');
    		done();
    	});
    });
});