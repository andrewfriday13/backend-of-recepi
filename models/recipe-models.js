const Joi = require("joi");
const { Schema, model } = require("mongoose");

const recipeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);
const Recipe = model("recipe", recipeSchema);
module.exports = { Recipe };
