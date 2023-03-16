const { Model, DataTypes } = require('sequelize');

const { LANGUAGE_TABLE } = require('./language.model');

const USER_TABLE = 'users';

const UserSchema = {
  userId: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    field: 'user_id'
  },
  firstName: {
    allowNull: false,
    type: DataTypes.STRING(100),
    validate: {
      notEmpty: true
    },
    field: 'first_name'
  },
  lastName: {
    allowNull: false,
    type: DataTypes.STRING(100),
    validate: {
      notEmpty: true
    },
    field: 'last_name'
  },
  email: {
    allowNull: false,   //Implement a strategy to save temporary emails
    type: DataTypes.STRING(150),
    unique: true,
    validate: {
      isEmail: true
    }
  },
  phoneNumber: {
    type: DataTypes.STRING(30),
    unique: true,     //required if not received a valid Email
    validate: {
      is: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/
    },
    field: 'phone_number'
  },
  dob: {
    type: DataTypes.DATEONLY,
    validate: {
      isAfter: '1900-01-01'
    }
  },
  enabled: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  verified: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  languageId: {
    type: DataTypes.STRING(2),
    allowNull: false,
    references: {
      model: LANGUAGE_TABLE,
      key: 'language_id',
    },
    field: 'language_id',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT'
  },
  role: {
    type: DataTypes.STRING(64)      //must be encrypted
  },
  recoveryToken: {
    type: DataTypes.STRING(50)
  },
  createdBy: {
    type: DataTypes.UUID,
    field: 'created_by'
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

class User extends Model {
  static associate(models){
    this.belongsTo(models.Language, {
      as: 'language',
      foreignKey:'languageId'
    });
    this.hasOne(models.Login, {
      as: 'login',
      foreignKey: 'userId'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: true
    }
  }
}

module.exports = { USER_TABLE, UserSchema, User };
