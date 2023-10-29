const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers/handleMongooseError");

const recipeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

recipeSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  name: Joi.string().required(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  addSchema,
  // updateFavoriteSchema,
};

const Recipe = model("recipe", recipeSchema);

module.exports = {
  Recipe,
  schemas,
};
