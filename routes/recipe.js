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
const { auth } = require("../middleware/authenticate");

const router = express.Router();

router.get("/recipe", auth, getAll);

router.get("/:id", auth, isValid, getById);

router.post("/", auth, validateBody(schemas.addSchema), newRecipe);

router.delete("/:id", auth, isValid, deleteRecipe);

router.put("/:id", auth, isValid, validateBody(schemas.addSchema), updateById);

router.patch("/:id/faivorite", auth, isValid, validateBody(schemas.updateFavoriteSchema), updateFaivorite);

module.exports = router;
