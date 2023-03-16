const { Model, DataTypes } = require('sequelize');

const { LANGUAGE_TABLE } = require('./language.model');

const TEXT_CONTENT_TABLE = 'text_content';

const TextContentSchema = {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true
  },
  originalLanguageId: {
    allowNull: false,
    type: DataTypes.STRING(2),
    field: 'original_language_id',
    references: {
      model: LANGUAGE_TABLE,
      key: 'language_id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT'
  },
  originalTextContent: {
    allowNull: false,
    type: DataTypes.STRING(400),
    field: 'original_text_content'
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

class TextContent extends Model {
  static associate(models){
    this.hasMany(models.TextTranslation, {as: 'textTranslation', foreignKey: 'textContentId'});
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: TEXT_CONTENT_TABLE,
      modelName: 'TextContent',
      timestamps: true
    }
  }
}

module.exports = { TEXT_CONTENT_TABLE, TextContentSchema, TextContent }
