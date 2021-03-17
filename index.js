const express = require('express')

const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors())

const allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header('Access-Control-Allow-Headers', 'auth, content-type,')
  res.header('Access-Control-Allow-Credentials', true)
  next()
}

app.use(allowCrossDomain)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const authRoute = require('./routes/auth.js')
const userRoute = require('./routes/user.js')
const productRoute = require('./routes/product.js')
const purchaseRoute = require('./routes/purchase.js')

app.use('/auth', authRoute)
app.use('/users', userRoute)
app.use('/products', productRoute)
app.use('/purchases', purchaseRoute)

app.listen(3333)

module.exports = app
