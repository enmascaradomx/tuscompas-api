'use strict';

const { UserSchema, USER_TABLE } = require('./../models/user.model');
const { LoginSchema, LOGIN_TABLE } = require('./../models/login.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(USER_TABLE, UserSchema);
    await queryInterface.createTable(LOGIN_TABLE, LoginSchema);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(LOGIN_TABLE);
    await queryInterface.dropTable(USER_TABLE);
  }
};
