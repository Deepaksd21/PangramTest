const Joi = require("joi");

/**
 * ! Validiting while user sign up
 */

exports.signupValidation = Joi.object({
  firstName: Joi.string().min(3).max(25).trim(true).required(),
  lastName: Joi.string().trim(true).required(),
  email: Joi.string().email().trim(true).required(),
  hobbies: Joi.string().trim(true).required(),
  password: Joi.string().min(8).trim(true).required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Passwords do not match",
  }),
  gender: Joi.string()
    .valid("Male", "Female", "Prefer not to answer")
    .required(),
  userType: Joi.string().valid("Employee", "Manager").required(),
  is_active: Joi.boolean().default(true),
});

/**
 * ! Validiting while user login
 */

exports.loginValidation = Joi.object({
  email: Joi.string().email().trim(true).required(),
  password: Joi.string().min(8).trim(true).required(),
});
