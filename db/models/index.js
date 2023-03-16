const { Language, LanguageSchema } = require('./language.model');
const { TextContent, TextContentSchema } = require('./textContent.model');
const { TextTranslation, TextTranslationSchema } = require('./textTranslation.model');
const { EventType, EventTypeSchema } = require('./eventType.model');
const { User, UserSchema } = require('./user.model');
const { Login, LoginSchema } = require('./login.model');

function setupModels (sequelize) {
  //Support Tables
  Language.init(LanguageSchema, Language.config(sequelize));
  TextContent.init(TextContentSchema, TextContent.config(sequelize));
  TextTranslation.init(TextTranslationSchema, TextTranslation.config(sequelize));
  EventType.init(EventTypeSchema, EventType.config(sequelize));

  //Users
  User.init(UserSchema, User.config(sequelize));
  Login.init(LoginSchema, Login.config(sequelize));

  //associates
  EventType.associate(sequelize.models);
  TextContent.associate(sequelize.models);
  User.associate(sequelize.models);
  Login.associate(sequelize.models);
}

module.exports = setupModels;
