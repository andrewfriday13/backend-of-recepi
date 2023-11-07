const {
  getAll,
  getById,
  newRecipe,
  deleteRecipe,
  updateById,
  updateFaivorite,
} = require("../controllers/recipe-controllers");
const { validateBody } = require("../middleware/validateBody.js");
const { schemas } = require("../models/recipe-models.js");
const isValid = require("../middleware/isValid.js");
const express = require("express");

const router = express.Router();

router.get("/recipe", getAll);

router.get("/:id", isValid, getById);

router.post("/", validateBody(schemas.addSchema), newRecipe);

router.delete("/:id", isValid, deleteRecipe);

router.put("/:id", isValid, validateBody(schemas.addSchema), updateById);

router.patch("/:id/faivorite", isValid, validateBody(schemas.updateFavoriteSchema), updateFaivorite);

module.exports = router;
