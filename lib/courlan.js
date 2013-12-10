"use strict";

var fs = require('fs');
var path = require('path');
var async = require('async');

var Courlan = module.exports = function(middlewareDir, callback) {
	
	fs.readdir(middlewareDir, function(err, files) {
		if (err) {
			callback(err);
			return;
		}

		async.eachSeries(files, function(filename, next) {

			// Only read JavaScript file
			if (path.extname(filename) != '.js') {
				next();
				return;
			}

			var fullpath = path.join(middlewareDir, filename);

			// Loading
			try {
				var mod = require(fullpath);
			} catch(e) {
				next();
				return;
			}

			if (mod.name) {
				Courlan[mod.name] = mod.middleware;
			}

			next();

		}, function(err) {

			callback(err);
		});
	});
};
