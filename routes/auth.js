const express = require('express')

const app = express()
const AuthController = require('../app/controllers/AuthController')

app.post('/', AuthController.auth)
app.post('/register', AuthController.register)

module.exports = app
