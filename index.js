var readline = require('readline')
var ansiDiff = require('ansi-diff')

function dashboard (render) {
  var diff = ansiDiff({ width: process.stdout.columns })

  var split = render().replace(/\r?\n$/, '').split(/\n/g)
  var y = split.length - 1
  var x = (split[split.length - 1] || '').length + 1

  function onresize () {
    diff.resize({ width: process.stdout.columns })
    render()
  }

  function ondata (chunk) {
    process.stdout.write(diff.update(render(chunk)), function () {
      readline.cursorTo(process.stdout, x, y)
    })
  }

  process.stdin.on('data', ondata)
  process.stdout.on('resize', onresize)
  ondata(null)

  return function update (data) {
    ondata(data)
  }
}

module.exports = dashboard