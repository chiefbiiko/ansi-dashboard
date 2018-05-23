const { screencheck, screenchecks } = require('./src/screencheck.js')

screenchecks([' https://github.com', 'https://flow.org/' ])
  .then(console.log)
  .catch(console.error)
