const Joi = require("joi");

const recipeSchema = Joi.object({
  title: Joi.string().required(),
  name: Joi.string().required(),
});
module.exports = { recipeSchema };
