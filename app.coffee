page = require('webpage').create()
system = require('system')

if system.args.length == 1
    imgWidth    = 400
    imgHeight   = 200
else
    imgWidth    = system.args[1]
    imgHeight   = system.args[2]


renderChart = (data, id) ->
    page.evaluate (rawData) ->
        drawChart(rawData)
    , data

    if id < 10
        id = '0' + id
    page.render('render/img' + id + '.png')
    console.log 'Rendered \'img' + id + '.png\''



page.onLoadFinished = (status) ->
    if status == 'success'
        data = getDataFor('gauge')
        for x in [0...data.length] by 1
            renderChart(data[x], x)
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

page.open('chart-markdown/gauge.html')




getDataFor = (type) ->
    if type == 'gauge'
        return [
                [
                    ['Label', 'Value'],
                    ['Foo', 1],
                    ['Bar', 1],
                    ['Baz', 1]
                ],
                [
                    ['Label', 'Value'],
                    ['fg', 200],
                    ['sdfsdg', 51],
                    ['Badsdgz', 87]
                ],
                [
                    ['Label', 'Value'],
                    ['Fodsfo', 65],
                    ['Baddr', 45],
                    ['Badfdsfz', 56]
                ],
                [
                     ['Label', 'Value'],
                     ['Fosdfo', 78],
                     ['Badsfr', 100],
                     ['Bdsfz', 54]
                ],
            ]
    

