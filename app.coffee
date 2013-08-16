page = require('webpage').create()
 
injectjQuery = ->
  # phantom allows to dynamically inject any javascript
  # into page context.
  # Make sure you add jquery to your script dir.
  page.injectJs './jquery.js'
  
  # ALWAYS do that when injecting jQuery into other page
  page.evaluate ->
    jQuery.noConflict()



replaceData = (data) -> 
    window.data = data
    console.log data
    page.evaluate ->
        window.rawData = data
        drawChart()



page.onLoadFinished = (status) ->
    if status == 'success'
        injectjQuery()
        for x in [0..3] by 1
            replaceData([['Label', 'Value'], ['Other', x], ['Boo', x], ['Waa', x]])
            page.render('render/img' + x + '.png')
        phantom.exit()
    else
        console.log('Connection failed.')
        phantom.exit()
 
# console messages send from within page context are ingnored by default
# this puts them back where they belong.
page.onConsoleMessage = (msg) ->
  console.log(msg)
 
page.open('chart.html')