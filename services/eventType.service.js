const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

const TextContentService = require('./textContent.service');
const textContentService = new TextContentService();

const attributeAsoc = [
  {
    association: 'textContent',
    attributes: ['originalLanguageId', 'originalTextContent', 'id'],
    include: {
      association: 'textTranslation',
      attributes: ['languageId', 'textContent', 'id']
    }
  }
]

class EventTypeService {
  constructor(){}

  async create(data) {
    //create the textcontent first, will received under the property: name
    const textContent = await textContentService.create(data.name);
    const textContentId = textContent.id;

    if (!textContentId) {
      throw new Error('EventType Error');
    }

    const newData = {
      ...data,
      nameTextId: textContentId
    }

    delete newData.name;

    const newEventType = await models.EventType.create(newData);
    return newEventType;
  }

  async find() {
    const data = await models.EventType.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: attributeAsoc
    });
    return data;
  }

  async findOne(id) {
    const eventType = await models.EventType.findByPk(id,{
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: attributeAsoc
    });

    if (!eventType) {
      throw boom.notFound('EventType not found');
    }
    return eventType;
  }

  async update(id, changes) {
    const model = await this.findOne(id);
    if (!model) {
      throw boom.notFound('EventType not found');
    }

    const updatedData = await models.EventType.update(changes, {
      attributes: { exclude: ['createdAt'] },
    });
    return updatedData;
  }
}

module.exports = EventTypeService;
