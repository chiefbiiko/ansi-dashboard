const dealias = require('aka-opts')
const { loadFont, read } = require('jimp')
const { join } = require('path')
const { promisify } = require('util')

function toFont (fontname) {
  return loadFont(join(
    './node_modules',
    'jimp',
    'fonts',
    'open-sans',
    fontname,
    fontname + '.fnt'
  ))
}

async function load (opts) {
  opts = dealias(opts || {}, { font: [ 'fontname' ] })
  opts = Object.assign({ font: 'open-sans-16-black', x: 0, y: 0 }, opts)
  const font = await toFont(opts.font)
  return async function stampic (picpath, stamp) {
    stamp = stamp || new Date().toISOString()
    const image = await read(picpath)
    image.print(font, opts.x, opts.y, stamp, image.bitmap.width)
    await promisify(image.write).call(image, picpath)
    return picpath
  }
}

module.exports = load