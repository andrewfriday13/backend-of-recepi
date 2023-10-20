const { x, getById, newRecipe, remove, update } = require("../controllers/recipe-controllers.js");
const { validateBody } = require("../decorators/validateBody.js");
const express = require("express");

const router = express.Router();
const { recipeSchema } = require("../schemas/recipeSchemas.js");
router.get("/", getAll);

router.get("/:id", getById);

router.post("/", validateBody(recipeSchema), newRecipe);

router.delete("/:id", remove);

router.put("/:id", validateBody(recipeSchema), update);

module.exports = router;
//логін andrew пароль On8nlwRFeL6HcOsN якийсь там пароль від бд
