const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const attributeAsoc = [
  {
    association: 'user',
    attributes: ['email', 'enabled', 'verified']
  }
];

const { models } = require('./../libs/sequelize');

class LoginService {

  constructor() {}

  async create(data) {
    const hash = await bcrypt.hash(data.password,10);
    const newData = {
      ...data,
      password: hash
    }
    const newLogin = await models.Login.create(newData);
    delete newLogin.dataValues.password;
    return newLogin;
  }

  async find() {
    const login = await models.Login.findAll({

    });
    return login;
  }

  async findOne(userId) {
    const login = await models.Login.findByPk(userId, {

    });
    if (!login) {
      throw boom.notFound('User not found!');
    }
    return login;
  }

  async findByUsername(username) {
    const login = await models.Login.findOne({
      where: { username },
      attributes: ['userId', 'username', 'password'],
      include: attributeAsoc,
    });
    return login;
  }

}

module.exports = LoginService;
