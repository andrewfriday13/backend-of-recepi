const express = require("express");
const { validateBody } = require("../middleware/validateBody.js");
const { schemas } = require("../models/user-models.js");
const { register, login } = require("../controllers/auth-controlers.js");

const router = express.Router();

router.post("/registration", validateBody(schemas.registerSchema), register);
router.post("/login", validateBody(schemas.loginSchema), login);

module.exports = router;
