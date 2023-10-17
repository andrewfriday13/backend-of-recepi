const express = require("express");

const HttpError = require("../helpers/HttpError.js");
import { listRecipe, getRecipeById } from "../models/contacts.js";
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await listRecipe();
    res.json({ message: "template message" });
  } catch (er) {
    res.status(500).json({
      message: "Not found",
    });
    console.log(er);
  }
});
console.log("ASDA");
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getRecipeById(id);
    if (!result) throw HttpError(404, `Id ${id} invalid`);
    res.json(result);
  } catch (er) {
    const { status = 500, message = "Error server" } = er;
    res.status(status).json({ message });
  }
});

router.post("/", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.delete("/:id", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:id", async (req, res, next) => {
  res.json({ message: "template message" });
});

// export default { router };
module.exports = router;
