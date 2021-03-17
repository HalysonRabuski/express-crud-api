const faker = require('faker')
const bcrypt = require('bcrypt')

const saltRounds = 10

const users = [...Array(100)].map(() => ({
  name: faker.name.firstName(),
  email: faker.internet.email(),
  password: bcrypt.hashSync(faker.internet.password(8), saltRounds),
  createdAt: new Date(),
  updatedAt: new Date(),
}))

module.exports = {
  up: async (queryInterface) => queryInterface.bulkInsert('Users', users, {}),

  down: async (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
}
