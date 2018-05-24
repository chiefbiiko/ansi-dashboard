const screencheck = require('./index')

screencheck([ 'https://github.com/' ])
  .then(console.log)
  .catch(console.error)
