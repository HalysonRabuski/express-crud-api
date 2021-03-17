const { Product } = require('../models')

exports.index = async (req, res) => {
  try {
    const products = await Product.findAll()

    return res.status(200).json(products)
  } catch (error) {
    console.log(error)
    return res.status(500).send({ error: 'Ocorreu um erro' })
  }
}

exports.store = async (req, res) => {
  const { name, description } = req.body

  if (!name || !description)
    return res.status(400).send({ error: 'Dados Insuficientes' })

  if (await Product.findOne({ where: { name } }))
    return res.status(403).send({ error: 'Curso já existe!' })

  try {
    const product = await Product.create(req.body)

    return res.status(200).json(product)
  } catch (error) {
    return res.status(500).send({ error: 'Ocorreu um erro' })
  }
}

exports.show = async (req, res) => {
  const { id } = req.params

  const product = await Product.findOne({
    where: {
      id,
    },
  })

  if (product) {
    return res.status(200).json({ product })
  }

  return res.status(404).send('Curso não encontrado')
}

exports.update = async (req, res) => {
  const { id } = req.params

  try {
    const [updated] = await Product.update(req.body, {
      where: { id },
    })

    if (updated) {
      const product = await Product.findOne({ where: { id } })
      return res.status(200).json(product)
    }
    throw new Error('Curso não encontrado')
  } catch (error) {
    return res.status(500).send(error)
  }
}

exports.delete = async (req, res) => {
  const { id } = req.params

  try {
    const deleted = await Product.destroy({
      where: { id },
    })

    if (deleted) {
      return res.status(200).send('Curso deletado')
    }

    throw new Error('Curso não encontrado')
  } catch (error) {
    return res.status(500).send(error.message)
  }
}
