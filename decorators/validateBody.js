const { HttpError } = require("../helpers/HttpError");
const validateBody = (schema) => {
  const func = async (req, res, next) => {
    const { id } = req.params;
    const result = await getRecipeById(id);
    if (!result) throw HttpError(404, `Id ${id} invalid`);
  };
  return func;
};
module.exports = { validateBody };
