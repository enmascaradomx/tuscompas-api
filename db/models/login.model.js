const { Model, DataTypes } = require('sequelize');

const { USER_TABLE } = require('./user.model');
const LOGIN_TABLE = 'login';

const LoginSchema = {
  userId: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
    field: 'user_id',
    references: {
      model: USER_TABLE,
      key: 'user_id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  username: {
    allowNull: false,
    type: DataTypes.STRING(50),
    unique: true,
    validate: {
      notEmpty: true,
      len: [8,50]
    }
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING(64)    //will be encrypted
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

class Login extends Model {
  static associate(models){
    this.belongsTo(models.User, {as: 'user', foreignKey: 'userId'});
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: LOGIN_TABLE,
      modelName: 'Login',
      timestamps: true
    }
  }
}

module.exports = { LOGIN_TABLE, LoginSchema, Login }
