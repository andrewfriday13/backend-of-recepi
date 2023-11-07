const { isValidObjectId } = require("mongoose");
const { HttpError } = require("../helpers/HttpError");

const isValid = (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  if (!isValidObjectId(id)) {
    next(HttpError(400, `${id} isnt valid`));
  }
  next();
};
module.exports = isValid;
