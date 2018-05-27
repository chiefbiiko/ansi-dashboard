const load = require('./index')

load()
  .then(stampic => {
    stampic('./pupp.png')
      .then(console.log)
      .catch(console.error)
  })
  .catch(console.error)
