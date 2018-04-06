// jshint asi:true

// Dependencies
const express     = require('express')
const app         = express()
const quoteRoutes = require('./routes/quotes')
const bodyParser  = require('body-parser')

// bodyParser Config
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// API routes
app.use('/api/quotes', quoteRoutes)

// Root Route
app.use('/', (req, res) => {
  res.json({message: 'Go to /api/quotes to get started'})
})

// Error handler
app.use((error, req, res, next) => {
  if (res.headersSent) {
    console.log('Headers have already been sent \nPassing to default error handler')
    return next(error)
  }

  res.status(error.status || 500).json({
    errors: [{ message: error.message }]
  })
})

// Start the server
app.listen(3000, () => {
  console.log('Quotes App listening on port 3000')
})