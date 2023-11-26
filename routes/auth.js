const express = require("express");
const { auth } = require("../middleware/authenticate");
const { upload } = require("../middleware/upload");
const { validateBody } = require("../middleware/validateBody.js");
const { schemas } = require("../models/user-models.js");
const { register, login, getCurrent, logOut, updateAvatar } = require("../controllers/auth-controlers.js");

const router = express.Router();

router.post("/registration", validateBody(schemas.registerSchema), register);
router.post("/login", validateBody(schemas.loginSchema), login);
router.get("/current", auth, getCurrent);
router.post("/logout", auth, logOut);
router.patch("/avatars", auth, upload.single("avatar"), updateAvatar);

module.exports = router;
