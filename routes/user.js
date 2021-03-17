const express = require('express')

const app = express()
const auth = require('../app/middlewares/auth')
const UserController = require('../app/controllers/UserController')

app.use(auth)

app.get('/', UserController.index)
app.get('/:id', UserController.show)
app.put('/:id', UserController.update)
app.delete('/:id', UserController.delete)

module.exports = app
