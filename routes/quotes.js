// jshint asi:true

const express = require('express')
const router = express.Router()
const fs = require('fs')
const {
  readQuote,
  writeQuote } = require('../helpers')


router.route('/')
  .get((req, res) => {
    res.json({message: 'Please specify a quote id'})
  })

  .post((req, res, next) => {
    writeQuote(req.body).then(
      results => {
        res.json(results)},
      error => next(error)
    )
  })

router.route('/:id')
  .get((req, res, next) => {
    readQuote(req.params.id).then(
      results => res.json(results),
      error => next(error))
  })

  .put((req, res) => {
    res.json({message: 'This will update a quote'})
  })

  .delete((req, res) => {
    res.json({message: 'This will delete a quote'})
  })

module.exports = router