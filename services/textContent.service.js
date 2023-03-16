const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

const TextTranslationService = require('./textTranslation.service');
const textTranslationService = new TextTranslationService();

class TextContentService {
  constructor(){}

  async create(data) {
    //obtain the list of translations
    const { translations } = data;
    //clean the data on text content.
    delete data.translations;
    //create the text content
    const textContent = await models.TextContent.create(data);
    const textContentId = textContent.id;

    if (translations){
      //Add the new TextContentId to all the translations
      const newTranslations = translations.map(obj => ({...obj, textContentId:textContentId}));

      await textTranslationService.create(newTranslations);
    }

    return textContent;
  }

  async findOne(id) {
    const textContent = await models.TextContent.findByPk(id,{
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    });

    if (!textContent){
      throw boom.notFound('TextContent not found');
    }

    return textContent;
  }
}

module.exports = TextContentService;
