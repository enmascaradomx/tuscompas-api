const { Model, DataTypes } = require('sequelize');

const LANGUAGE_TABLE = 'languages';

const LanguageSchema = {
  languageId: {
    primaryKey: true,
    type: DataTypes.STRING(2),
    field: 'language_id',
    validate: {
      len: 2
    }
  },
  name: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING(50),
    validate: {
      notEmpty: true,
      len: [3,50]
    }
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

class Language extends Model {
  static associate() {

  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: LANGUAGE_TABLE,
      modelName: 'Language',
      timestamps: true
    }
  }
}

module.exports = { LANGUAGE_TABLE, LanguageSchema, Language }
