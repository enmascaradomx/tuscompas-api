const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const { config } = require('./../config/config');
const sequelize = require('../libs/sequelize');

const attributeAsoc = [
  {
    association: 'login',
    attributes: ['username']
  },
  {
    association: 'language',
    attributes: ['name']
  }
];

class UserService {
  constructor() {}

  async find() {
    const data = await sequelize.models.User.findAll({
      include: attributeAsoc
    });
    return data;
  }

  async findOne(id) {
    const user = await sequelize.models.User.findByPk(id, {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: attributeAsoc
    });

    if (!user) {
      throw boom.notFound('user not found');
    }

    return user;
  }

  async create(data) {
    //encrypt the password and add to the object
    const hashPwd = await bcrypt.hash(data.login.password, 10);
    let newData = {
      ...data,
      login: {
        ...data.login,
        password: hashPwd
      }
    }

    //the first user will be an admin, enabled and verified automatically
    const firstUser = await sequelize.models.User.findOne();
    if (!firstUser || data.isAdmin) {
      newData = {
        ...newData,
        role: config.adminRole,
        enabled: true,
        verified: true
      }
    }

    if (newData.role) {
      const hashRole = await bcrypt.hash(newData.role, 10);
      newData = {
        ...newData,
        role: hashRole
      }
    }

    try {
      const result = await sequelize.transaction(async(t) => {
        const newUser = await sequelize.models.User.create(newData, {
          include: ['login'],
          transaction: t
        }, { transaction: t });

        delete newUser.dataValues.login;
        return newUser;
      });

      return result;
    } catch(error) {
      throw boom.conflict(error);
    }
  }

  async createUserOnly(data, createdBy) {
    let newData = {
      ...data,
      createdBy: createdBy
    }

    if (!newData.email) {
      const email = newData.phoneNumber + '@fivepete.com'
      newData = {
        ...newData,
        email: email
      }
    }

    const newUser = await sequelize.models.User.create(newData);
    return newUser;
  }
}

module.exports = UserService;
