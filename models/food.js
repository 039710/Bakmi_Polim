'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Food extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Food.belongsToMany(models.User,{through: models.Invoice})
    }
  };
  Food.init({
    name:{ 
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Name cannot be empty!'
        },
        len: {
          args : [2,100],
          msg: 'Length of name must be 2 characters upto 100 characters!'
        }
      }
    },
    description: { 
      type: DataTypes.TEXT,
      validate: {
        notEmpty: {
          msg: 'Description cannot be empty!'
        },
        len: {
          args : [4,500],
          msg: 'Length of description must be 4 characters upto 300 characters!'
        }
      }
    },
    img_url: { 
      type: DataTypes.TEXT,
      validate: {
        notEmpty: {
          msg: 'Please select an image!'
        },
      }
    },
    price: { 
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'Price cannot be empty!',
        },
        min : {
          args : 1000,
          msg: 'Minimal food price is 1000!'
        }
      }
    },
    quantity: { 
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'Quantity cannot be empty!'
        },
        min : {
          args : 1,
          msg: 'Minimal stock is 1!'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Food',
  });
  return Food;
};