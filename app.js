var sys = require('sys'),
spawn = require('child_process').spawn,
async = require('async');

var imgCount = 3;
var maxCon = 1;

var render = function(data, callback) {
	console.log('Starting Rendering: ' + data.name);
	
	spawn('phantomjs', ['render.js', data.name, data.type, data.width, data.height, data.arguments])
	.on('close', function (code) {
		console.log('Finished rendering of ' + data.name + ' | Status: ' + code);
		callback();
	});
};

var allData = [];
for (var i = 0; i < imgCount; i++) {
	allData.push([['Year', 'Players', 'DownTimes'], ['2004', 1000, 20], ['2005', 1170, 50], ['2006', 660, 1], ['2007', 50, 23]]);
};

var queue = async.queue(render, maxCon);
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