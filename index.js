var EventEmitter = require('events').EventEmitter
var inherits = require('util').inherits
var cursorTo = require('readline').cursorTo
var ansiDiff = require('ansi-diff')

function Dashboard (render, opts) {
  if (!(this instanceof Dashboard)) return new Dashboard(render, opts)
  EventEmitter.call(this, opts)

  this._diff = ansiDiff({ width: process.stdout.columns })
  this._render = render

  process.stdin.on('data', this._ondata.bind(this))
  this.update()
}

inherits(Dashboard, EventEmitter)

Dashboard.prototype._ondata = function ondata (chunk) {
  this.emit('userinput', chunk, this.update.bind(this))
}

Dashboard.prototype._onwrite = function onwrite (x, y) {
  cursorTo(process.stdout, x, y)
}

Dashboard.prototype.update = function update (...args) {
  var dash = this._render(...args)
  var x = dash.replace(/\r?\n$/, '').match(/[^\n]*$/)[0].length
  var y = (dash.match(/\n(?=.)/g) || '').length
  process.stdout.write(this._diff.update(dash), this._onwrite.bind(this, x, y))
}

module.exports = Dashboard
