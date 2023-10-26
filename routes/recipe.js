const { getAll, getById, newRecipe, deleteRecipe, changeRecipe } = require("../controllers/recipe-controllers");
const { validateBody } = require("../decorators/validateBody.js");
const express = require("express");

const router = express.Router();
const { recipeSchema } = require("../schemas/recipeSchemas.js");

router.get("/recipe", getAll);

// router.get("/:id", getById);

// router.post("/", validateBody(recipeSchema), newRecipe);

// router.delete("/:id", deleteRecipe);

// router.put("/:id", validateBody(recipeSchema), changeRecipe);

module.exports = router;
