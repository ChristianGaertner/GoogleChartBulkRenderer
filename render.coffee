page = require('webpage').create()
system = require('system')

typeIsArray = Array.isArray || ( value ) -> return {}.toString.call( value ) is '[object Array]'

if system.args.length == 6
    id          = system.args[1]
    data        = system.args[2]
    type        = system.args[3]
    imgWidth    = system.args[4]
    imgHeight   = system.args[5]
else
    console.log 'Usage: render.js id data type imgWidth imgHeight'
    phantom.exit()

# id = '0'
# type = 'linechart'
# imgWidth = 500
# imgHeight = 900
# data = [
#                     ['Label', 'Value'],
#                     ['Foo', 1],
#                     ['Bar', 1],
#                     ['Baz', 1]
#                 ]


console.log '--- Starting Image Generation ---'
console.log '-+ Chart Type: ' + type
console.log '-+ Image Width: ' + imgWidth
console.log '-+ Image Height: ' + imgHeight
console.log '---------------------------------'


renderChart = (data, id) ->
    page.evaluate (rawData) ->
        window.rawData = rawData
        drawChart(rawData)
    , data

    if id < 10
        id = '0' + id
    page.render('render/img' + id + '.png')
    console.log 'Rendered \'img' + id + '.png\''



page.onLoadFinished = (status) ->
    if status == 'success'
        renderChart(data, id)
        phantom.exit()

    else
        console.log('Connection failed.')
        phantom.exit()
 

page.onConsoleMessage = (msg) ->
  console.log(msg)


page.viewportSize = {
    width: imgWidth,
    height: imgHeight
}

page.open('chart-markdown/' + type + '.html')