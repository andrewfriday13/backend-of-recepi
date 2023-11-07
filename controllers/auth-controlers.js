const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const { User } = require("../models/user-models");

const { HttpError } = require("../helpers/HttpError.js");
const ctrlWrapper = require("../helpers/ctrlWrapper.js");

const register = async (req, res) => {
  const newUser = await User.create(req.body);
  res.json({
    message: " register success",
  });
  //   const { email } = req.body;
  //   const user = await User.findOne({ email });
  //   if (user) {
  //     throw HttpError(409, "User already exists");
  //   }
};

const login = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "User not found");
  }
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
};
