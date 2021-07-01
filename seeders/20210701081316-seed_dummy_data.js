'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let data = require('../data/foods.json')
    data.forEach((current)=>{
      current.createdAt = new Date()
      current.updatedAt = new Date()
    })
    return queryInterface.bulkInsert('Food',data,{})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Food',null,{})
  }
};
