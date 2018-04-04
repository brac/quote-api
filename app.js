// jshint asi:true

const express = require('express')
const app = express()
const quoteRoutes = require('./routes/quotes')

app.use('/api/quotes', quoteRoutes)

app.use('/', (req, res) => {
  res.json({message: 'Go to /api/quotes to get started'})
})

// Error handler
app.use(function (err, req, res, next) {
  if (res.headersSent) {
    console.log('Passing to default error handler')
    return next(err)
  }
  res.status(err.status || 500).json({
    errors: [
      `Error over here! ${err}`]
  })
})

app.listen(3000, () => {
  console.log('Quptes App listening on port 3000')
})