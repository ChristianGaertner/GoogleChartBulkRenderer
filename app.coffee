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
    page.evaluate (s) ->
        drawChart(s)
    , data




page.onLoadFinished = (status) ->
    if status == 'success'
        x = 1
        injectjQuery()
        replaceData([['Label', 'Value'], ['Other', x], ['Foo', x], ['Waa', x]])
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