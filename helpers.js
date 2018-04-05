// jshint asi:true

const fs = require('fs')

const readQuote = (id) => {
  return new Promise((resolve, reject) => {
     fs.readFile(`./quotes/${id}.json`, 'utf8', (error, data) => {
      if (error) {
        error.status = 404
        return reject(error)
      }

      // Success, parse the data and resolve it back to the caller
      resolve(JSON.parse(data))
     })
  })
}

const writeQuote = (reqBody) => {
  return new Promise((resolve, reject) => {
    let data = {
      quote: reqBody.quote,
      author: reqBody.author
    }

    data = JSON.stringify(data)

    fs.writeFile(`./quotes/${counter}.json`, data, (error) => {
      if (error) { return reject(error)}
      resolve({message: 'Created Quote'})
    })
  })
}


module.exports = {
  readQuote,
  writeQuote
}