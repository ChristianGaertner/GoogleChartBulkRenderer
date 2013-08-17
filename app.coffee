page = require('webpage').create()
system = require('system')

typeIsArray = Array.isArray || ( value ) -> return {}.toString.call( value ) is '[object Array]'


if system.args.length == 2
    type = system.args[1]
    imgWidth    = 400
    imgHeight   = 200
else
    if system.args.length == 4
        type        = system.args[1]
        imgWidth    = system.args[2]
        imgHeight   = system.args[3]
    else
        type        = 'gauge'



console.log '--- Starting Image Generation ---'
console.log '-+ Chart Type: ' + type
console.log '-+ Image Width: ' + imgWidth
console.log '-+ Image Height: ' + imgHeight
console.log '---------------------------------'


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
        data = getDataFor(type)
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

page.open('chart-markdown/' + type + '.html')



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
                    ['Memory', 80],
                    ['CPU', 55],
                    ['Network', 68]
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
    else if type == 'linechart'
        return [
                  [
                    ['Year', 'Players', 'DownTimes'],
                    ['2004',  1000,      20],
                    ['2005',  1170,      50],
                    ['2006',  660,       1],
                    ['2007',  50,      23]
                   ],
                   [
                    ['Year', 'Players', 'DownTimes'],
                    ['2004',  1000,      0],
                    ['2005',  1170,      0],
                    ['2006',  660,       5],
                    ['2007',  1030,      0]
                   ]
            ]
    else if type == 'piechart'
        return [
                [
                  ['Task', 'Hours per Day'],
                  ['Work',     11],
                  ['Eat',      2],
                  ['Commute',  2],
                  ['Watch TV', 2],
                  ['Sleep',    7]
                ],
                [
                    ['Task', 'Hours per Day'],
                    ['Work',     0],
                    ['Eat',      0],
                    ['Commute',  0],
                    ['Watch TV', 0],
                    ['Sleep',    24]
                ]
        ]