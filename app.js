var sys = require('sys'),
spawn = require('child_process').spawn,



// data = [['Label', 'Value'], ['Foo', 2], ['Bar', 1], ['Baz', 1]], // gauge
data = [['Year', 'Players', 'DownTimes'], ['2004', 1000, 20], ['2005', 1170, 50], ['2006', 660, 1], ['2007', 50, 23]], // linechart
// data = [['Task', 'Hours per Day'], ['Work', 11], ['Eat', 2], ['Commute', 2], ['Watch TV', 2], ['Sleep', 7]], // piechart
arguments = JSON.stringify(data);


var prc = spawn('phantomjs', ['render.js', 'name', 'linechart', 500, 500, arguments]);
prc.stdout.setEncoding('utf8');

prc.stdout.on('data', function(data) {
	var str = data.toString()
    var lines = str.split(/(\r?\n)/g);
    console.log('>>\n' + lines.join("") + '\n<<');
});

prc.on('close', function (code) {
    console.log('process exit code ' + code);
});