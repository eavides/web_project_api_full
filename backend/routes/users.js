const userRouter = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const {
  getUsers,
  findUser,
  createUser,
  updateUser,
  updateAvatar,
  meUser,
} = require("../controllers/users.js");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

// userRouter.post("/", createUser);
userRouter.get("/me", meUser);
userRouter.patch(
  "/me",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  updateUser
);
userRouter.get(
  "/:id",
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().alphanum().min(24),
    }),
  }),
  findUser
);
userRouter.patch(
  "/me/avatar",
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().custom(validateURL),
    }),
  }),
  updateAvatar
);
userRouter.get("/", getUsers);
module.exports = userRouter;
