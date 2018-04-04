// jshint asi:true

const express = require('express')
const router = express.Router()
const fs = require('fs')
const { readQuote } = require('../helpers')

router.route('/')
  .get((req, res) => {
    res.json({message: 'Please specify a quote id'})
  })

  .post((req, res) => {
    res.json({message: 'This will post a quote'})
  })

router.route('/:id')
  .get((req, res, next) => {
    readQuote(req.params.id, (err, data) => {
      if (err) { next(err)}
      res.json(data)
    })
  })

  .put((req, res) => {
    res.json({message: 'This will update a quote'})
  })

  .delete((req, res) => {
    res.json({message: 'This will delete a quote'})
  })

module.exports = router