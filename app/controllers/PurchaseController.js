const { Product, User, Purchase } = require('../models')

exports.index = async (req, res) => {
  try {
    const purchases = await Purchase.findAll({
      where: { user_id: req.userId },
      include: [{ model: Product, as: 'products' }],
    })

    // const products = await user.getProducts()

    return res.status(200).json(purchases)
  } catch (error) {
    console.log(error)
    return res.status(500).send({ error: 'Ocorreu um erro' })
  }
}

exports.store = async (req, res) => {
  const { products } = req.body

  if (!products) return res.status(400).send({ error: 'Dados Insuficientes' })

  const purchase = await Purchase.create({ user_id: req.userId })

  try {
    for (const element of products) {
      const prdt = await Product.findByPk(element.id)
      await purchase.addProduct(prdt)
    }

    return res.status(200).json(purchase)
  } catch (error) {
    console.log(error)
    return res.status(500).send({ error: 'Ocorreu um erro' })
  }

  // try {
  //   const user = await User.findByPk(req.userId)

  //   await user.addProduct(product)

  //   return res.status(200).json(user)
  // } catch (error) {
  //   console.log(error)
  //   return res.status(500).send({ error: 'Ocorreu um erro' })
  // }
}

// exports.show = async (req, res) => {
//   const { id } = req.params

//   const product = await Product.findOne({
//     where: {
//       id,
//     },
//   })

//   if (product) {
//     return res.status(200).json({ product })
//   }

//   return res.status(404).send('Curso não encontrado')
// }

// exports.update = async (req, res) => {
//   const { id } = req.params

//   try {
//     const [updated] = await Product.update(req.body, {
//       where: { id },
//     })

//     if (updated) {
//       const product = await Product.findOne({ where: { id } })
//       return res.status(200).json(product)
//     }
//     throw new Error('Curso não encontrado')
//   } catch (error) {
//     return res.status(500).send(error)
//   }
// }

// exports.delete = async (req, res) => {
//   const { id } = req.params

//   try {
//     const deleted = await Product.destroy({
//       where: { id },
//     })

//     if (deleted) {
//       return res.status(200).send('Curso deletado')
//     }

//     throw new Error('Curso não encontrado')
//   } catch (error) {
//     return res.status(500).send(error.message)
//   }
// }
