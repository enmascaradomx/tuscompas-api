const joi = require('joi');

const userId = joi.string().uuid();
const firstName = joi.string().alphanum().min(3).max(100);
const lastName = joi.string().alphanum().min(3).max(100);
const email = joi.string().email();
const phoneNumber = joi.string().pattern(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/);
const dob = joi.date();
const enabled = joi.boolean();
const verified = joi.boolean();
const languageId = joi.string().length(2);
const isAdmin = joi.boolean();

const username = joi.string().alphanum().min(8).max(50);
const password = joi.string().pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,30}$'));


const getUserSchema = joi.object({
  userId: userId.required()
});

const createUserSchema = joi.object({
  firstName: firstName.required(),
  lastName: lastName.required(),
  email: email.required(),
  phoneNumber,
  dob,
  enabled,
  verified,
  languageId: languageId.required(),
  isAdmin,
  login: joi.object({
    username: username.required(),
    password: password.required(),
    repeat_password: joi.ref('password')
  })
    .required()
    .with('password', 'repeat_password')
});

const createUserOnlySchema = joi.object({
  firstName: firstName.required(),
  lastName: lastName.required(),
  email,
  phoneNumber,
  languageId: languageId.required()
})
  .xor('email', 'phoneNumber');

module.exports = { getUserSchema, createUserSchema, createUserOnlySchema };
