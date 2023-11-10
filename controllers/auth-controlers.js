const bcrypt = require("bcrypt");
const { SECRET_KEY } = process.env;

const jwt = require("jsonwebtoken");
const { User } = require("../models/user-models");

const { HttpError } = require("../helpers/HttpError.js");
const ctrlWrapper = require("../helpers/ctrlWrapper.js");

const register = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) throw HttpError(409, "Email already in use");

  const hashPassword = await bcrypt.hash(password, 11);

  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    message: " register success",
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) throw HttpError(401, "Email or password invalid");

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid");
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });

  res.json({ token });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
};
