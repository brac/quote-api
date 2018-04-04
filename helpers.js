// jshint asi:true

const fs = require('fs')

const readQuote = (id) => {
  return new Promise((resolve, reject) => {
     fs.readFile(`./quotes/${id}.json`, 'utf8', (error, data) => {
      if (error) {
        error.status = 404
        return reject(error)
      }

      resolve(JSON.parse(data))
     })
  })
}


module.exports = {
  readQuote
}