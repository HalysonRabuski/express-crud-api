module.exports = {
  up: async (queryInterface, DataTypes) =>
    queryInterface.createTable('Purchases_Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        type: DataTypes.INTEGER,
      },
      product_id: {
        type: DataTypes.INTEGER,
        references: { model: 'products', key: 'id' },
        onDelete: 'CASCADE',
        allowNull: false,
      },
      purchase_id: {
        type: DataTypes.INTEGER,
        references: { model: 'purchases', key: 'id' },
        onDelete: 'CASCADE',
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    }),

  down: async (queryInterface) =>
    queryInterface.dropTable('Purchases_Products'),
}
