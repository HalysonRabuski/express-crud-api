module.exports = (sequelize, DataTypes) => {
  const Purchase = sequelize.define('Purchase', {
    user_id: DataTypes.INTEGER,
  })

  Purchase.associate = (models) => {
    Purchase.belongsToMany(models.Product, {
      through: 'purchases_products',
      as: 'products',
      foreignKey: 'purchase_id',
    })
  }

  return Purchase
}
