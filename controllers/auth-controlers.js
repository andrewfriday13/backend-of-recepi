const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs");

const { SECRET_KEY } = process.env;

const jwt = require("jsonwebtoken");
const { User } = require("../models/user-models");

const { HttpError } = require("../helpers/HttpError.js");
const ctrlWrapper = require("../helpers/ctrlWrapper.js");

const avatarDir = path.join();
const register = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email already in use");
  }
  const avatar = gravatar.url(email);
  const hashPassword = await bcrypt.hash(password, 11);

  const newUser = await User.create({ ...req.body, password: hashPassword, avatar });

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

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  console.log(req.file);
  const { path: tempUpload, originalname } = req.file;
  const resultUpload = path.join(avatarDir, originalname);
  await fs.rename(tempUpload, resultUpload);
  const avatar = path.join("picture", originalname);
  await User.findByIdAndUpdate(_id, avatar);
  res.json({
    message: "update success",
  });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logOut: ctrlWrapper(logOut),
  updateAvatar: ctrlWrapper(updateAvatar),
  // updateAvatar,
};
