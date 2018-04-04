// jshint asi:true

const express = require('express')
const router = express.Router()



router.route('/')
  .get((req, res) => {
    res.json({message: 'Please specify a quote id'})
  })

  .post((req, res) => {
    res.json({message: 'This will post a quote'})
  })

router.route('/:id')
  .get((req, res) => {
    res.json({message: 'This will return a quote'})
  })

  .put((req, res) => {
    res.json({message: 'This will update a quote'})
  })

  .delete((req, res) => {
    res.json({message: 'This will delete a quote'})
  })

module.exports = router