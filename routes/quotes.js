// jshint asi:true

const express = require('express')
const router = express.Router()
const fs = require('fs')
const {
  readQuote,
  writeQuote,
  updateQuote,
  deleteQuote } = require('../helpers')


router.route('/')
  .get((req, res) => {
    res.json({message: 'Please specify a quote id and method'})
  })

  .post((req, res, next) => {
    writeQuote(req.body).then(
      results => {
        process.env.CNTR++
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

  .put((req, res, next) => {
    updateQuote(req.body, req.params.id).then(
      results => res.json(results),
      error => next(error)
    )
  })

  .delete((req, res, next) => {
    deleteQuote(req.params.id).then(
      results => res.json(results),
      error => next(error)
    )
  })

module.exports = router