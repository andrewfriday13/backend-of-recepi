// const fs = require('fs/promises')
const getAllRecipe = async () => {};

// const removeRecipe = async (id) => {
//   try {
//     const recipe = await getAllRecipe();
//     const result = recipe.findIndex((item) => item.id === id);
//   } catch (er) {
//     next(er);
//   }
// };

// const addRecipe = async (data) => {
//   const recipe = await getAllRecipe();
//   const newRecipe = {
//     id: nanoid(),
//     ...data,
//   };
//   recipe.push(newRecipe);
//   return console.log(newRecipe);
// };
// const getRecipeById = async (id) => {
//   const recipe = await getAllRecipe();
//   const result = recipe.find((item) => item.id === id);
//   return result || null;
// };

// const updateRecipeById = async (id, data) => {
//   const allRecipe = await getAllRecipe();
//   const recipe = allRecipe.findIndex((item) => item.id === id);
//   if (recipe === -1) null;
// };

module.exports = {
  getAllRecipe,
  // getRecipeById,
  // removeRecipe,
  // addRecipe,
  // updateRecipeById,
};
