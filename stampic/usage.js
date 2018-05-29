const load = require('./index')

(async () => {
  const stampic = await load()
  const picpath = await stampic('./pupp.png')
  console.log('pic got stamped', picpath)
})()

// load()
//   .then(stampic => {
//     stampic('./pupp.png')
//       .then(console.log)
//       .catch(console.error)
//   })
//   .catch(console.error)
