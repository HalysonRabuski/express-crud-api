const { users } = require('../models')

exports.index = async (res) => {
  try {
    const allUsers = await users.findAll({
      attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
    })

    return res.status(200).json(allUsers)
  } catch (error) {
    return res.status(500).send({ error: 'Ocorreu um erro' })
  }
}

exports.show = async (req, res) => {
  const { id } = req.params

  const user = await users.findOne({
    attributes: ['id', 'name', 'email'],
    where: {
      id,
    },
  })

  if (user) {
    return res.status(200).json({ user })
  }

  return res.status(404).send('Usúario não encontrado')
}

exports.update = async (req, res) => {
  const { id } = req.params

  try {
    const [updated] = await users.update(req.body, {
      where: { id },
    })

    if (updated) {
      const user = await users.findOne({ where: { id } })
      return res.status(200).json(user)
    }
    throw new Error('Usuário não encontrado')
  } catch (error) {
    return res.status(500).send(error)
  }
}

exports.delete = async (req, res) => {
  const { id } = req.params

  try {
    const deleted = await users.destroy({
      where: { id },
    })

    if (deleted) {
      return res.status(200).send('Usúario deletado')
    }

    throw new Error('Usúario não encontrado')
  } catch (error) {
    return res.status(500).send(error.message)
  }
}
