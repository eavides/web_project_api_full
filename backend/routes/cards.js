const cardRouter = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");
const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

cardRouter.get("/", getCards);
cardRouter.post(
  "/",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      link: Joi.string().required().custom(validateURL),
    }),
  }),
  createCard
);
cardRouter.delete(
  "/:id",
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().alphanum().min(24),
    }),
  }),
  deleteCard
);
cardRouter.put(
  "/:id/likes",
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().alphanum().min(24),
    }),
  }),
  likeCard
);
cardRouter.delete(
  "/:id/likes",
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().alphanum().min(24),
    }),
  }),
  dislikeCard
);
module.exports = cardRouter;
