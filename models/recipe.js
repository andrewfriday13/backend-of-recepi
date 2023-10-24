// const fs = require('fs/promises')
const getAllRecipe = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner }, "-createdAt -updatedAt", { skip, limit }).populate(
    "owner",
    "name email"
  );
  res.json(result);
};

const removeRecipe = async (id) => {
  try {
    const recipe = await getAllRecipe();
    const result = recipe.findIndex((item) => item.id === id);
  } catch (er) {
    next(er);
  }
};

const addRecipe = async (data) => {
  const recipe = await getAllRecipe();
  const newRecipe = {
    id: nanoid(),
    ...data,
  };
  recipe.push(newRecipe);
  return console.log(newRecipe);
};
const getRecipeById = async (id) => {
  const recipe = await getAllRecipe();
  const result = recipe.find((item) => item.id === id);
  return result.json(result) || null;
};

const updateRecipeById = async (id, data) => {
  const allRecipe = await getAllRecipe();
  const recipe = allRecipe.findIndex((item) => item.id === id);
  if (recipe === -1) null;
};

module.exports = {
  getAllRecipe,
  getRecipeById,
  removeRecipe,
  addRecipe,
  updateRecipeById,
};
