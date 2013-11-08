module.exports = PhantomRender;

function PhantomRender(maxCon) {
	var sys = require('sys'),
	spawn = require('child_process').spawn,
	async = require('async'),
	q = require('q');
	
	var render = function(name, type, width, height, arguments) {
		var deferred = q.defer();

		spawn('phantomjs', ['render.js', name, type, width, height, arguments])
		.on('close', function (code) {
			if (code == 0) {
				deferred.resolve(name);
			} else {
				deferred.reject(new Error('Error in PhantomJS process. Exit Code: ' + code));
			}
		});

		return deferred.promise;
	};

	var queue = async.queue(function(data, callback) {
		queue.beforeEach(data.name);
		render(data.name, data.type, data.width, data.height, data.arguments)
		.then(callback);
	}, maxCon);

	// Custom queueAPI
	queue.beforeEach = function(){};

	return queue;
}