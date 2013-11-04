var sys = require('sys'),
spawn = require('child_process').spawn;

/**
 * Time Measurement
 * Expected Times:
 * (Tested on iMac 3.06GHz Intel Core i3; 12GB 1067 MHz DDR 3 RAM; OS X 10.8.5)
 * 01 image : 02185ms => 02.185s
 * 10 images: 06876ms => 06.876s
 * 20 images: 11799ms => 11.799s
 * 50 images: 28367ms => 28.367s
 * 80 images: 46380ms => 46.380s
 * 81 images: FAILED.
 */
process.on('exit', function() {
	console.timeEnd("Rendering");	
});

var imgCount = 10;


var render = function(name, type, width, height, arguments) {
	console.log('Starting Rendering: ' + name);
	var prc = spawn('phantomjs', ['render.js', name, type, width, height, arguments]);
	// prc.stdout.setEncoding('utf8');
	// prc.stdout.on('data', function(data) {
	// 	var str = data.toString()
	//     var lines = str.split(/(\r?\n)/g);
	//     console.log('>>\n' + lines.join("") + '\n<<');
	// });

	prc.on('close', function (code) {
		    console.log('Finished rendering of ' + name + ' | Status: ' + code);
	});	
};

var allData = [];

for (var i = 0; i < imgCount; i++) {
	allData.push([['Year', 'Players', 'DownTimes'], ['2004', 1000, 20], ['2005', 1170, 50], ['2006', 660, 1], ['2007', 50, 23]]);
};

console.time("Rendering");
for (var i = 0; i < allData.length; i++) {
	arguments = JSON.stringify(allData[i]);
	render('img' + i, 'linechart', 500, 500, arguments, i);
};