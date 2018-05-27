const Jimp = require('jimp')
const { join } = require('path')

const FONT = join(
  './node_modules',
  'jimp',
  'fonts',
  'open-sans',
  'open-sans-16-black',
  'open-sans-16-black.fnt'
)

async function stampic (picpath) {
  const original = await Jimp.read(picpath)
  const image = original.clone()
  const font = await Jimp.loadFont(FONT)
  image.print(font, 0, 0, new Date().toISOString(), image.bitmap.width)
  image.write(PIC, err => { if (err) throw err })
  return picpath
}

module.exports = stampic

// Jimp.read(PIC)
//   .then(original => {
//     const image = original.clone()
//
//     Jimp.loadFont(FONT)
//       .then(font => {
//         image.print(font, 0, 0, new Date().toISOString(), image.bitmap.width)
//         image.write(PIC, err => {
//           if (err) return console.error(err)
//         })
//       })
//       .catch(console.error)
//
//   })
//   .catch(console.error)
