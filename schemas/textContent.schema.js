const joi = require('joi');

const languageId = joi.string().length(2);;
const textContent = joi.string().max(350);

const translations = joi.array().items({
  languageId: languageId.required(),
  textContent: textContent.required()
});

const updateTranslations = joi.object({
  languageId,
  textContent
});

const createTextContentSchema = joi.object({
  originalLanguageId: languageId.required(),
  originalTextContent: textContent.required(),
  translations
});

const updateTextContentSchema = joi.object({
  originalLanguageId: languageId,
  originalTextContent: textContent
});

module.exports = { createTextContentSchema, updateTextContentSchema, updateTranslations }
