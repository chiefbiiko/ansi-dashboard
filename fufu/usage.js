const screencheck = require('./index')

screencheck([ 'https://github.com/' ], './screenshots')
  .then(console.log)
  .catch(console.error)
