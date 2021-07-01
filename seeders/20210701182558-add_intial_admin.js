'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
 
    return queryInterface.bulkInsert('Users', [{
      first_name : "admin",
      last_name : "admin",
      email : "admin@admin.com",
      phone_number : "0888888888",
      birth_date : "2021-07-07",
      address : "Jalan Simatupang",
      role : "Admin",
      password : "$2a$10$2lTTo0PuUfrEB6TflnyFwuGNfVSGs8XITN5GYxMYBIMuouufqL.ja", // password is admin
      createdAt : new Date(),
      updatedAt : new Date(),
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Users', null,{})
  }
};
