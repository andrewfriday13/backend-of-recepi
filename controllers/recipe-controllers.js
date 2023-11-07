const { Recipe } = require("../models/recipe-models");

const { HttpError } = require("../helpers/HttpError.js");
const ctrlWrapper = require("../helpers/ctrlWrapper.js");

const getAll = async (req, res) => {
  const result = await Recipe.find({}, "-createdAt -updatedAt");
  res.json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Recipe.findById(id);
  if (!result) {
    throw HttpError(404, "нема");
  }
  res.json(result);
};

const newRecipe = async (req, res) => {
  const result = await Recipe.create(req.body);
  res.status(201).json(result);
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  const result = await Recipe.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(404, "Not нема");
  }
  res.json({
    message: "delete success",
  });
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const result = await Recipe.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};
const updateFaivorite = async (req, res) => {
  const { id } = req.params;
  const result = await Recipe.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  newRecipe: ctrlWrapper(newRecipe),
  deleteRecipe: ctrlWrapper(deleteRecipe),
  updateById: ctrlWrapper(updateById),
  updateFaivorite: ctrlWrapper(updateFaivorite),
};
