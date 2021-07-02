'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Invoice.init({
    FoodId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    quantity_per_item: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    hooks : {
      beforeCreate : (instance,option)=>{
        instance.status = "not delivered"
      }
    },
    sequelize,
    modelName: 'Invoice',
  });
  return Invoice;
};