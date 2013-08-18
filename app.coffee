sys = require('sys')
exec = require('child_process').exec;

data = [
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

type = 'gauge'

for x in [0...data.length] by 1
	child = exec("phantomjs render.js " + x + " [data] " + type + " 500 600", stdout)


stdout =  (error, stdout, stderr) ->
	console.log "stdout: \n" + stdout
	console.log "\n---stdout-END"
	console.log "exec error: " + error  if error isnt null