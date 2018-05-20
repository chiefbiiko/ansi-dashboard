var dashboard = require('./index')

// render function must return a string
// gets passed buffered user input on stdin data
function render (chunk) {
  return '::dashboard::\n' +
    'the time is: ' + new Date().toISOString() + '\n' +
    'refresh? [press enter]\n'
}

// call update to rerender from your program
var update = dashboard(render)