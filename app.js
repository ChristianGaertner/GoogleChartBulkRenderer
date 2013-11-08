var sys = require('sys'),
spawn = require('child_process').spawn,
async = require('async');

var imgCount = 3;
var maxCon = 1;

var render = function(name, type, width, height, arguments, callback) {
	spawn('phantomjs', ['render.js', name, type, width, height, arguments])
	.on('close', function (code) {
		if (code == 0) {
			callback(null, name);
		} else {
			callback(new Error('Error in PhantomJS process. Exit Code: ' + code), name);
		}
	});
};

var allData = [];
for (var i = 0; i < imgCount; i++) {
	allData.push([['Year', 'Players', 'DownTimes'], ['2004', 1000, 20], ['2005', 1170, 50], ['2006', 660, 1], ['2007', 50, 23]]);
};

var queue = async.queue(function(data, callback) {
	console.log('Starting Rendering: ' + data.name);
	
	render(data.name, data.type, data.width, data.height, data.arguments, function(err, name) {
		if (err) console.log('Failed to Render: ' + name  + '>> '+ err);
		console.log('Finished rendering of ' + name);
		callback();
	});
}, maxCon);

queue.drain = function() {
	console.timeEnd("Rendering");
}

console.time("Rendering");
for (var i = 0; i < allData.length; i++) {
	arguments = JSON.stringify(allData[i]);
	queue.push({
		name: 'img' + i,
		type: 'linechart',
		width: 500,
		height: 500,
		arguments: arguments
	}, function() {});
};