'use strict';
const { EventTypeSchema, EVENT_TYPE_TABLE } = require('./../models/eventType.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(EVENT_TYPE_TABLE, EventTypeSchema);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(EVENT_TYPE_TABLE);
  }
};
