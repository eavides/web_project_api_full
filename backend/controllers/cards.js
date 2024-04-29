const Card = require("../models/card.js");

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((card) => {
      res.send(card);
    })
    .catch((error) => {
      const ERROR_CODE = 400;
      if (error.name === "SomeErrorName")
        return res.status(ERROR_CODE).send({
          message: "tarjeta o usuario no encontrado",
        });
    });
};

module.exports.createCard = (req, res) => {
  const body = req.body;
  Card.create({
    name: body.name,
    link: body.link,
    owner: req.user._id,
    likes: body.likes,
    createdAt: body.createdAt,
  })
    .then((card) => {
      res.send(card);
    })
    .catch((error) => {
      const ERROR_CODE = 400;
      if (error.name === "SomeErrorName")
        return res.status(ERROR_CODE).send({
          message: "Error en creacion de tarjeta",
        });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findById(req.params.id)
    .orFail()
    .then((card) => {
      if (card.owner.toString() === req.user._id) {
        Card.findByIdAndDelete(req.params.id)
          .orFail()
          .then((card) => {
            res.send(card);
          })
          .catch((error) => {
            const ERROR_CODE = 400;
            if (error.name === "SomeErrorName")
              return res.status(ERROR_CODE).send({
                message: "tarjeta o usuario no encontrado",
              });
          });
      } else {
        return res
          .status(401)
          .send({ message: "No posee autorizacion de eliminar card" });
      }
    });
};

module.exports.likeCard = (req, res) => {
  const update = { $addToSet: { likes: req.user._id } };

  Card.findByIdAndUpdate({ _id: req.params.id }, update, { new: true })
    .orFail()
    .then((card) => {
      res.send(card);
    })
    .catch((error) => {
      const ERROR_CODE = 400;
      if (error.name === "SomeErrorName")
        return res.status(ERROR_CODE).send({
          message: "tarjeta o usuario no encontrado",
        });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } }, // elimina _id del array
    { new: true }
  )
    .orFail()
    .then((card) => {
      res.send(card);
    })
    .catch((error) => {
      const ERROR_CODE = 400;
      if (error.name === "SomeErrorName")
        return res.status(ERROR_CODE).send({
          message: "tarjeta o usuario no encontrado",
        });
    });
};
