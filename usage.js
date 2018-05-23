var Dashboard = require('./index')

// render function must return a string
function render (data) {
  return '::dashboard::\n' +
    'data is: ' + (data || new Date().toISOString()) + '\n' +
    'refresh? [press enter]\n'
}

// event emitter
var dashboard = new Dashboard(render)

// update dashboard on user input
dashboard.on('userinput', function onuserinput (chunk, update) {
  var line = chunk.toString() // check, transform, whatever user input...
  update(/* update passes args 2 render */)
})

// update dashboard whenever
setInterval(function () {
  dashboard.update()
}, 5000)
