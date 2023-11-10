const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../middleware/handleMongooseError");
const emailExp = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/;
const passwordExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: emailExp,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailExp).required(),
  password: Joi.string().pattern(passwordExp).required(),
});
const loginSchema = Joi.object({
  email: Joi.string().pattern(emailExp).required(),
  password: Joi.string().pattern(passwordExp).required(),
});

const schemas = {
  registerSchema,
  loginSchema,
};
const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
