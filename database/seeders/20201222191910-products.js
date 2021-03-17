const faker = require('faker')

const products = [...Array(100)].map(() => ({
  name: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  createdAt: new Date(),
  updatedAt: new Date(),
}))

module.exports = {
  up: async (queryInterface) =>
    queryInterface.bulkInsert('Products', products, {}),

  down: async (queryInterface) =>
    queryInterface.bulkDelete('Products', null, {}),
}
