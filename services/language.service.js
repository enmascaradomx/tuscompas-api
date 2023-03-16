const { models } = require('./../libs/sequelize');
const boom = require('@hapi/boom');

class LanguageService {
  constructor() {

  }

  async find() {
    const data = await models.Language.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    });
    return data;
  }

  async findOne(id) {
    const data = await models.Language.findByPk(id, {
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    });
    if (!data) {
      throw boom.notFound('Language not found');
    }
    return data;
  }

  async create(data) {
    const newData = await models.Language.create(data);
    return newData;
  }
}

module.exports = LanguageService;
