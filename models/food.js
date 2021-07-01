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
          msg: 'name cannot be empty!',
        },
        len: {
          args : [4,100],
          msg: 'length of name must be 4 characters upto 10 characters'
        }
      }
    },
    description: { 
      type: DataTypes.TEXT,
      validate: {
        notEmpty: {
          msg: 'description cannot be empty!',
        },
        len: {
          args : [10,500],
          msg: 'length of first description must be 4 characters upto 300 characters'
        }
      }
    },
    img_url: { 
      type: DataTypes.TEXT,
      validate: {
        notEmpty: {
          msg: 'please select a image!',
        },
      }
    },
    price: { 
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'price! cant be empty!',
        },
        min : {
          args : 1000,
          msg: 'harga makanan minimal  1000'
        }
      }
    },
    quantity: { 
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'quantity cant be empty!',
        },
        min : {
          args : 1,
          msg: 'minimal stock 1'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Food',
  });
  return Food;
};