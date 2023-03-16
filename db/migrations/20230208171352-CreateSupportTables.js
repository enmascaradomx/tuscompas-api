'use strict';

const { LanguageSchema, LANGUAGE_TABLE } = require('./../models/language.model');
const { TextContentSchema, TEXT_CONTENT_TABLE } = require('./../models/textContent.model');
const { TextTranslationSchema, TEXT_TRANSLATION_TABLE } = require('./../models/textTranslation.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(LANGUAGE_TABLE, LanguageSchema);
    await queryInterface.createTable(TEXT_CONTENT_TABLE, TextContentSchema);
    await queryInterface.createTable(TEXT_TRANSLATION_TABLE, TextTranslationSchema);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(TEXT_TRANSLATION_TABLE);
    await queryInterface.dropTable(TEXT_CONTENT_TABLE);
    await queryInterface.dropTable(LANGUAGE_TABLE);
  }
};
