// Generated by CoffeeScript 1.6.3
var page, renderChart;

page = require('webpage').create();

renderChart = function(data) {
  var x, _i, _ref, _results;
  console.log(data.length);
  _results = [];
  for (x = _i = 0, _ref = data.length; _i < _ref; x = _i += 1) {
    page.evaluate(function(rawData) {
      return drawChart(rawData);
    }, data[x]);
    if (x < 10) {
      x = '0' + x;
    }
    page.render('render/img' + x + '.png');
    _results.push(console.log('Rendered \'img' + x + '.png\''));
  }
  return _results;
};

page.onLoadFinished = function(status) {
  var data;
  if (status === 'success') {
    data = [[['Label', 'Value'], ['Foo', 1], ['Bar', 1], ['Baz', 1]], [['Label', 'Value'], ['fg', 200], ['sdfsdg', 51], ['Badsdgz', 87]], [['Label', 'Value'], ['Fodsfo', 65], ['Baddr', 45], ['Badfdsfz', 56]], [['Label', 'Value'], ['Fosdfo', 78], ['Badsfr', 100], ['Bdsfz', 54]]];
    renderChart(data);
    return phantom.exit();
  } else {
    console.log('Connection failed.');
    return phantom.exit();
  }
};

page.onConsoleMessage = function(msg) {
  return console.log(msg);
};

page.open('chart.html');
