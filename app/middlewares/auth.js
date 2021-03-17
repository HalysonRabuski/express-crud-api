const jwt = require('jsonwebtoken')
const config = require('../../config/jwt')

const auth = (req, res, next) => {
  const tokenHeader = req.headers.authorization.split(' ')[1]

  if (!tokenHeader) return res.status(401).send({ error: 'Login expirado!' })
  jwt.verify(tokenHeader, config.jwt, (err, decoded) => {
    if (err) return res.status(401).send({ error: 'Token Invalido!' })
    res.locals.auth_data = decoded
    req.userId = decoded.id
    return next()
  })
  return {}
}

module.exports = auth
