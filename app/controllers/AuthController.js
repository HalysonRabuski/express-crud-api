const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const saltRounds = 10
const config = require('../../config/jwt')
const { User } = require('../models')

const createUserToken = (userId, userName) =>
  jwt.sign({ id: userId, name: userName }, config.jwt)

exports.auth = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password)
    return res.status(400).send({ error: 'Dados Insuficientes!' })

  try {
    const user = await User.findOne({ where: { email } })

    if (!user) return res.status(400).send({ error: 'Email não encontrado!' })

    bcrypt.compare(req.body.password, user.password, (err, results) => {
      if (err) {
        throw new Error(err)
      }
      if (results) {
        return res.status(200).send({
          user,
          token: createUserToken(user.id, user.name),
        })
      }
      return res.status(401).json({ error: 'Email e senha não conferem' })
    })

    user.password = undefined

    return user
  } catch (error) {
    return res.status(500).send({ error: 'Ocorreu um erro!' })
  }
}

exports.register = async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password)
    return res.status(400).send({ error: 'Dados Insuficientes' })

  if (await User.findOne({ where: { email } }))
    return res.status(403).send({ error: 'Usuário ja existe!' })

  req.body.password = bcrypt.hashSync(password, saltRounds)

  const user = await User.create(req.body)

  // user.password = undefined

  return res.status(200).json(user)
}
