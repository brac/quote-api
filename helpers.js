// jshint asi:true

const fs = require('fs')

const readQuote = (id, cb) => {
  fs.readFile('./quotes/1.json', 'utf8', (err, data) => {
    if (err) { cb(err) }
    data = JSON.parse(data)
    cb(null, data)
  })
}


module.exports = {
  readQuote
}