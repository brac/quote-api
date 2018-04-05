// jshint asi:true

const fs = require('fs')

const readQuote = (id) => {
  return new Promise((resolve, reject) => {
     fs.readFile(`./quotes/${id}.json`, 'utf8', (error, data) => {
      if (error) {
        error.status = 404
        error.message = `No file at that id: ${id}`
        return reject(error)
      }
      resolve(JSON.parse(data))
     })
  })
}

const writeQuote = (reqBody, id) => {
  return new Promise((resolve, reject) => {
    let data = {
      quote: reqBody.quote,
      author: reqBody.author
    }

    data = JSON.stringify(data)
    let counter = (id) ? id : process.env.CNTR

    fs.writeFile(`./quotes/${counter}.json`, data, (error) => {
      if (error) { return reject(error)}
      resolve({message: `Successfully created the file ${counter}.json`})
    })
  })
}

const updateQuote = (reqBody, id) => {
  return new Promise((resolve, reject) => {
    readQuote(id).then(
      results => {
        for(let prop in reqBody) {
          results[prop] = reqBody[prop]
        }

        writeQuote(results, id).then(
          results => resolve(`Successfully udpated the file ${id}.json`),
          error => {return reject(error)}
        )},
      error => {return reject(error)}
    )
  })
}

const deleteQuote = (id) => {
  return new Promise((resolve, reject) => {
    readQuote(id).then(
      results => {
        fs.unlink(`./quotes/${id}.json`, (error) => {
          if (error) { return reject(error)}
          resolve(`Successfully deleted the file ${id}.json`)
        })
      },
      error => {
        error.message = `No file at that id: ${id}`
        error.status = 404
        return reject(error)
      }
    )
  })
}

module.exports = {
  readQuote,
  writeQuote,
  updateQuote,
  deleteQuote
}