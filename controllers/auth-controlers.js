const bcrypt = require("bcrypt");
const { SECRET_KEY } = process.env;

const jwt = require("jsonwebtoken");
const { User } = require("../models/user-models");

const { HttpError } = require("../helpers/HttpError.js");
const ctrlWrapper = require("../helpers/ctrlWrapper.js");

const register = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email already in use");
  }

  const hashPassword = await bcrypt.hash(password, 11);

  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    message: " register success",
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  const { _id } = user;

  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid");
  }
  const payload = {
    id: _id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });

  await User.findByIdAndUpdate(_id, { token });
  res.json({ token });
};
const getCurrent = async (req, res, next) => {
  const { email, name } = req.user;
  res.json({
    email,
    name,
  });
};

const logOut = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.json({
    message: "Log out success",
  });
};
module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logOut: ctrlWrapper(logOut),
};
