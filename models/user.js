'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // User.belongsToMany(models.Food, {through: models.Invoice})
      // User.hasMany(models.Invoice)
    }
    getBirthDate() {
      return new Date(this.birth_date).toISOString().split('T')[0]

    }
  };
  User.init({
    first_name: { 
      type: DataTypes.STRING,
      validation: {
        notEmpty: {
          msg: 'First name cannot be empty!',
        }
      }
    },
    last_name: { 
      type: DataTypes.STRING,
      validation: {
        notEmpty: {
          msg: 'Last name cannot be empty!',
        }
      }
    },
    email: { 
      type: DataTypes.STRING,
      validation: {
        notEmpty: {
          msg: 'Email cannot be empty!',
        },
        isEmail: {
          msg: 'Fill with the right email address format!'
        }
      }
    },
    phone_number: { 
      type: DataTypes.INTEGER,
      validation: {
        notEmpty: {
          msg: 'Phone number cannot be empty!'
        }
      }
    },
    birth_date: { 
      type: DataTypes.DATE,
      validation: {
        notEmpty: {
          msg: 'Birth date cannot be empty!'
        }
      }
    },
    address: { 
      type: DataTypes.STRING,
      validation: {
        notEmpty: {
          msg: 'Address cannot be empty!'
        }
      }
    },
    role: DataTypes.STRING,
    password: { 
      type: DataTypes.STRING,
      validation: {
        notEmpty: {
          msg: 'Password cannot be empty!'
        }
      }
    },
  }, {
    hooks: {
      beforeCreate: (instance, options) => {
        instance.role = 'Customer'
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};