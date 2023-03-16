const { Model, DataTypes } = require('sequelize');
const { TEXT_CONTENT_TABLE } = require('./textContent.model');

const EVENT_TYPE_TABLE = 'event_type';

const EventTypeSchema = {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    field: 'event_type_id'
  },
  nameTextId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'name_text_id',
    references: {
      model: TEXT_CONTENT_TABLE,
      key: 'id'
    }
  },
  enabled: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at'
  },
  updatedAt: {
    type: DataTypes.DATE,
    field: 'updated_at'
  }
}

class EventType extends Model {
  static associate(models){
    this.belongsTo(models.TextContent, {as: 'textContent', foreignKey: 'nameTextId'});
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: EVENT_TYPE_TABLE,
      modelName: 'EventType',
      timestamps: true
    }
  }
}

module.exports = { EVENT_TYPE_TABLE, EventTypeSchema, EventType}
