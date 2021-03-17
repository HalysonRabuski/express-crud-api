const express = require('express')

const app = express()
const auth = require('../app/middlewares/auth')
const PurchaseController = require('../app/controllers/PurchaseController')

app.use(auth)

app.get('/', PurchaseController.index)
app.post('/', PurchaseController.store)
// app.get('/:id', ProductController.show)
// app.put('/:id', ProductController.update)
// app.delete('/:id', ProductController.delete)

module.exports = app
