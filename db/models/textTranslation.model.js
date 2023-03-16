const { Model, DataTypes } = require('sequelize');
const { LANGUAGE_TABLE } = require('./language.model');
const { TEXT_CONTENT_TABLE } = require('./textContent.model');

const TEXT_TRANSLATION_TABLE = 'text_translations';

const TextTranslationSchema = {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true
  },
  textContentId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'text_content_id',
    references: {
      model: TEXT_CONTENT_TABLE,
      key: 'id'
    }
  },
  languageId: {
    allowNull: false,
    type: DataTypes.STRING(2),
    field: 'language_id',
    references: {
      model: LANGUAGE_TABLE,
      key: 'language_id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT'
  },
  textContent: {
    allowNull: false,
    type: DataTypes.STRING(400),
    field: 'text_content'
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

class TextTranslation extends Model {
  static associate(models){
    this.belongsTo(models.TextContent, {as: 'originalTextContent', foreignKey: 'id' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: TEXT_TRANSLATION_TABLE,
      modelName: 'TextTranslation',
      timestamps: true
    }
  }
}

module.exports = { TEXT_TRANSLATION_TABLE, TextTranslationSchema, TextTranslation }
