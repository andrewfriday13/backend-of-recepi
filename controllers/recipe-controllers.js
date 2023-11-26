const { Recipe } = require("../models/recipe-models");

const { HttpError } = require("../helpers/HttpError.js");
const ctrlWrapper = require("../helpers/ctrlWrapper.js");

const getAll = async (req, res) => {
  console.log(req.params);
  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Recipe.find({ owner }, "-createdAt -updatedAt", { skip, limit }).populate("owner", "name email");
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
  const { _id: owner } = req.user;
  const result = await Recipe.create({ ...req.body, owner });
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
