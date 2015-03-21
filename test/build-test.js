'use strict';

var
	fs = require('fs'),
	assert = require('assert');

function testBuild(type) {
	return function(done) {

    	fs.readFile('./test/build/' + type + '.js', function(err, file) {
    		var
    			farr = file.toString().split('\n');

    		assert.equal(farr[0], '// common');
    		assert.equal(farr[1], '// ' + type);
    		done();
    	});
    };
}

describe('build', function() {
    it('should generate two files', function(done) {

    	fs.readdir('./test/build', function(err, list) {
    		assert.equal(list.length, 2);
    		done();
    	});
    });
    it('should contain common and a-specific', testBuild('a-specific'));
    it('should contain common and b-specific', testBuild('b-specific'));
});
