const { getAllRecipe, getRecipeById, addRecipe, removeRecipe, updateRecipeById } = require("../models/recipe.js");

const HttpError = require("../helpers/HttpError.js");
const { ctrlWrapper } = require("../decorators/ctrlWrapper.js");

const getAll = async (req, res) => {
  const result = await getAllRecipe();
  console.log(result);
  res.json({ message: "template message" });
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await getRecipeById(id);
  if (!result) throw HttpError(404, `Id ${id} invalid`);
  res.json(result);
};

const newRecipe = async (req, res) => {
  const result = await addRecipe(req.body);
  res.status(201).json(result);
  res.json({ message: "template message" });
};

const remove = async (req, res) => {
  const { id } = req.params;
  const result = await removeRecipe(id);
  if (!result) throw HttpError(404, `Id ${id} invalid`);
  res.json({ message: "delete sucsess  " });
};

const update = async (req, res) => {
  const { id } = req.params;
  const result = await updateRecipeById(id, req.body);
  if (!result) throw HttpError(404, `Id ${id} invalid`);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  newRecipe: ctrlWrapper(newRecipe),
  remove: ctrlWrapper(remove),
  update: ctrlWrapper(update),
};
