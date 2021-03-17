module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
  })

  Product.associate = (models) => {
    Product.belongsToMany(models.Purchase, {
      through: 'purchases_products',
      as: 'purchases',
      foreignKey: 'product_id',
    })
  }

  return Product
}
