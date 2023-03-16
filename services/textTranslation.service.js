const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

class TextTranslationService {
  constructor() {}

  async create(data) {
    //Create multiple records in one step.
    const createdTranslations = await models.TextTranslation.bulkCreate(data);
    return createdTranslations;
  }

  async findOne(id) {
    const textTranslation = await models.TextTranslation.findByPk(id, {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    if (!textTranslation) {
      throw boom.notFound('TextTranslation not found');
    }
    return textTranslation;
  }

  async update(id, changes) {
    const model = await this.findOne(id);
    if (!model) {
      throw boom.notFound('Translation not found. Cannot be updated');
    }
    const newModel = await models.update(changes);
    return newModel;
  }
}

module.exports = TextTranslationService;
