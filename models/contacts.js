// const fs = require('fs/promises')

const listRecipe = async () => {};

const getRecipeById = async (recipeId) => {};

const removeRecipe = async (recipeId) => {};

const addRecipe = async (data) => {
  // const recipe = await getAllRecipe();
  // const newRecipe = {
  //   id: nanoid(),
  //   ...data,
  // };
  // recipe.push(newRecipe);
  // return console.log(newRecipe);;
};

const updateRecipe = async (recipeId, body) => {};
const getByIdRecipe = async (id) => {
  const recipe = await getAllRecipe();
  const result = recipe.find((item) => item.id === id);
  return result || null;
};

const editRecipe = async (id, data) => {
  const allRecipe = await getAllRecipe();
  const recipe = allRecipe.findIndex((item) => item.id === id);
  if (recipe === -1) null;
};

module.exports = {
  listRecipe,
  getRecipeById,
  removeRecipe,
  addRecipe,
  updateRecipe,
};
