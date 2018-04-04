// jshint asi:true

const express = require('express')
const router = express.Router()
const fs = require('fs')
const { readQuote } = require('../helpers')

router.route('/')
  .get((req, res) => {
    res.json({message: 'Please specify a quote id'})
  })

  .post((req, res, next) => {

    let data = {
      quote: 'Ask not for whome the dog barks, he barks for thee',
      author: 'Rudy Rudeface'
    }

    data = JSON.stringify(data)

    console.log('Trying to write!')
    fs.writeFile('./quotes/1.json', data, (error) => {
      if (error) { return next(error)}
      res.json({message: 'Something happened'})
    })
  })

router.route('/:id')
  .get((req, res, next) => {
    readQuote(req.params.id).then(
      results => res.json(results),
      error => {
        next(error) }
    )
  })

  .put((req, res) => {
    res.json({message: 'This will update a quote'})
  })

  .delete((req, res) => {
    res.json({message: 'This will delete a quote'})
  })

module.exports = router