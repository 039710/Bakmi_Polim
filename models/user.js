'use strict';
let bcrypt = require('bcryptjs');
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
      User.belongsToMany(models.User,{through: models.Invoice, as : 'invoice'})
    }
    getBirthDate() {
      return new Date(this.birth_date).toISOString().split('T')[0]
    }
  };
  User.init({
    first_name: { 
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'First name cannot be empty!',
        },
        len: {
          args : [2,30],
          msg: 'Length of first name must be 4 characters upto 30 characters'
        }
      }
    },
    last_name: { 
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Last name cannot be empty!',
        },
        len: {
          args : [2,30],
          msg: 'Length of last name must be 4 characters upto 30 characters'
        }
      }
    },
    email: { 
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Email cannot be empty!',
        },
        isEmail: {
          msg: 'Fill with the right email address format!'
        },
        len: {
          args : [5,30],
          msg: 'Length of email must be 5 characters upto 30 characters'
        }
      }
    },
    phone_number: { 
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Phone number cannot be empty!'
        },
        isInt : {
          msg : "Phone number must be number not contains string!"
        }
      }
    },
    birth_date: { 
      type: DataTypes.DATE,
      validate : {
        notEmpty: {
          msg : 'Birth date cannot be empty!'
        }
      }
    },
    address: { 
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Address cannot be empty!'
        }
      }
    },
    role: DataTypes.STRING,
    password: { 
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Password cannot be empty!'
        },
        len: {
          args : [5,100],
          msg: 'Length of Passowrd must be 5 characters upto 100 characters'
        }
      }
    },
  }, {
    hooks: {
      beforeCreate: (instance, options) => {
        instance.role = 'Customer'
        // bcryptjs implementation
        let salt = bcrypt.genSaltSync(10)
        let hash = bcrypt.hashSync(instance.password,salt)
        instance.password = hash
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};