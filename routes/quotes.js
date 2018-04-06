// jshint asi:true

// Dependencies
const express = require('express')
const router = express.Router()
const fs = require('fs')
const {
  readQuote,
  writeQuote,
  updateQuote,
  deleteQuote } = require('../helpers')

// Root api route /api/quotes
router.route('/')
  .get((req, res) => {
    res.json({message: 'Please specify a quote id and method'})
  })

  // Create a new quote
  .post((req, res, next) => {
    writeQuote(req.body).then(
      results => {
        // Increment the counter for the next new quote
        process.env.CNTR++
        res.json(results)},
      error => next(error)
    )
  })

// Individual quote api routes
router.route('/:id')
  // Get individual quote
  .get((req, res, next) => {
    readQuote(req.params.id).then(
      results => res.json(results),
      error => next(error))
  })

  // Update quote
  .put((req, res, next) => {
    updateQuote(req.body, req.params.id).then(
      results => res.json(results),
      error => next(error)
    )
  })

  // Delete quote
  .delete((req, res, next) => {
    deleteQuote(req.params.id).then(
      results => res.json(results),
      error => next(error)
    )
  })

module.exports = router