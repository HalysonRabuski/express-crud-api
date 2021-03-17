const express = require('express')

const app = express()
const auth = require('../app/middlewares/auth')
const ProductController = require('../app/controllers/ProductController')

app.use(auth)

app.get('/', ProductController.index)
app.post('/', ProductController.store)
app.get('/:id', ProductController.show)
app.put('/:id', ProductController.update)
app.delete('/:id', ProductController.delete)

module.exports = app
