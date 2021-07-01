'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Invoices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      FoodId: {
        type: Sequelize.INTEGER,
        references: {
          model : 'Foods',
          keys : 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: {
          model : 'Users',
          key : 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      quantity_per_item: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Invoices');
  }
};