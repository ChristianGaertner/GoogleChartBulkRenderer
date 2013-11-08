var Renderer = require('./phantomRender.js');

var r = new Renderer(5);

var imgCount = 10;

var allData = [];
for (var i = 0; i < imgCount; i++) {
	allData.push([['Year', 'Players', 'DownTimes'], ['2004', 1000, 20], ['2005', 1170, 50], ['2006', 660, 1], ['2007', 50, 23]]);
};


for (var i = 0; i < allData.length; i++) {
	arguments = JSON.stringify(allData[i]);
	r.push({
		name: 'img' + i,
		type: 'linechart',
		width: 500,
		height: 500,
		arguments: arguments
	}, function(name) {
		console.log('DONE<< ' + name);
	});
}

r.beforeEach = function(name) {
	console.log('START>> ' + name);
}