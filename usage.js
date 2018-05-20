var dashboard = require('./index')

// render function must have arity 0 and return a string
function render () {
  return '::dashboard::\n' +
    'the time is: ' + new Date().toISOString() + '\n' +
    'refresh? [press enter]\n'
}

// call update to rerender from your program
var update = dashboard(render)