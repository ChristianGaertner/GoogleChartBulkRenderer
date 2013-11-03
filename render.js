var page = require('webpage').create(),
fs = require('fs');

var type = 'piechart',
imgWidth = 400,
imgHeight = 200,
name = 'piechart',
// data = [['Label', 'Value'], ['Foo', 2], ['Bar', 1], ['Baz', 1]] // gauge
data = [['Year', 'Players', 'DownTimes'], ['2004', 1000, 20], ['2005', 1170, 50], ['2006', 660, 1], ['2007', 50, 23]] // linechart
data = [['Task', 'Hours per Day'], ['Work', 11], ['Eat', 2], ['Commute', 2], ['Watch TV', 2], ['Sleep', 7]] // piechart
;

console.log('--- Starting Image Generation ---');
console.log('-+ Chart Type: ' + type);
console.log('-+ Image Width: ' + imgWidth);
console.log('-+ Image Height: ' + imgHeight);
console.log('---------------------------------');


var renderChart = function(data) {
    page.evaluate(function(data) {
        drawChart(data);
    }, data);

    setTimeout(function() {
        console.log('Rendering...');
        page.render('render/' + name + '.png');
        console.log('Finished. Exiting...');
        phantom.exit();
    }, 300);

}


page.viewportSize = {
  width: imgWidth,
  height: imgHeight
};

page.onConsoleMessage = function(msg) {
    return console.log(msg);
};

page.onLoadFinished = function(status) {

    if (status === 'success') {
        renderChart(data);
    } else {
        console.log('Connection failed.');
        phantom.exit();
    }
};


page.open('chart-markdown/' + type + '.html');