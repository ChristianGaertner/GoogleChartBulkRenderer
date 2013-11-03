/**
 * Copyright 2013 Christian Gärtner <christiangaertner.film@googlemail.com>
 * A basic google chart renderer
 * Run this file using phantomjs
 * Usage:
 * phantomjs render.js NAME TYPE WIDTH HEIGHT DATA
 * Example:
 * phantomjs render.js diagramm01 linechart 500 500, [['some, data'], ['some', 'data']]
 */

// Imports
var page = require('webpage').create(),
fs = require('fs'),
system = require('system');

// Image specifications
var type = system.args[2],
imgWidth = system.args[3],
imgHeight = system.args[4],
name = system.args[1],
data = JSON.parse(system.args[5]);

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
    return console.log('console [' +source +':' +line +']> ' +msg);
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