var sys = require('sys'),
spawn = require('child_process').spawn;

var DEBUG = false;

var cmdArgs = process.argv.splice(2);

if (cmdArgs[0] == 'debug' || cmdArgs[0] == 'DEBUG') {
	DEBUG = true;
}

var render = function(name, type, width, height, arguments) {
	var prc = spawn('phantomjs', ['render.js', name, type, width, height, arguments]);
	prc.stdout.setEncoding('utf8');

	if (DEBUG) {
		prc.stdout.on('data', function(data) {
			var str = data.toString()
		    var lines = str.split(/(\r?\n)/g);
		    console.log('>>\n' + lines.join("") + '\n<<');
		});

		prc.on('close', function (code) {
		    console.log('process exit code ' + code);
		});
	}
	
};

var allData = [
		[['Year', 'Players', 'DownTimes'], ['2004', 1000, 20], ['2005', 1170, 50], ['2006', 660, 1], ['2007', 50, 23]],
		[['Year', 'Players', 'DownTimes'], ['2004', 1000, 0], ['2005', 1170, 20], ['2006', 660, 2], ['2007', 1030, 2]],
		[['Year', 'Players', 'DownTimes'], ['2004', 1000, 0], ['2005', 1170, 40], ['2006', 660, 3], ['2007', 1030, 55]],
		[['Year', 'Players', 'DownTimes'], ['2004', 1000, 0], ['2005', 1170, 10], ['2006', 660, 55], ['2007', 1030, 44]]
	];

for (var i = allData.length - 1; i >= 0; i--) {
	arguments = JSON.stringify(allData[i]);
	render('img' + i, 'linechart', 500, 500, arguments);
};