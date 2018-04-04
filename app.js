// jshint asi:true

const express     = require('express')
const app         = express()
const quoteRoutes = require('./routes/quotes')
const bodyParser  = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/api/quotes', quoteRoutes)

app.use('/', (req, res) => {
  res.json({message: 'Go to /api/quotes to get started'})
})

// Error handler
app.use( (error, req, res, next) => {
  if (res.headersSent) {
    console.log('Headers have already been sent \nPassing to default error handler')
    return next(error)
  }

  res.status(error.status || 500).json({
    errors: [ error.message ]
  })
})

app.listen(3000, () => {
  console.log('Quptes App listening on port 3000')
})