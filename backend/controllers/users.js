const bcrypt = require("bcryptjs");
const User = require("../models/users.js");
const jwt = require("jsonwebtoken");
const { NODE_ENV, JWT_SECRET } = process.env;
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      const ERROR_CODE = 400;
      if (error.name === "SomeErrorName")
        return res.status(ERROR_CODE).send({
          message:
            "se pasaron datos inválidos a los métodos para crear un usuario/tarjeta o para actualizar el avatar/perfil de un usuario",
        });
    });
};

module.exports.findUser = (req, res) => {
  User.findById(req.params.id)
    .orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      return res.status(404).send({
        message:
          "se pasaron datos inválidos a los métodos para crear un usuario/tarjeta o para actualizar el avatar/perfil de un usuario",
      });
    });
};

module.exports.createUser = (req, res) => {
  const body = req.body;
  bcrypt
    .hash(body.password, 10)
    .then((hash) =>
      User.create({
        name: body.name,
        about: body.about,
        avatar: body.avatar,
        email: body.email,
        password: hash,
      })
    )
    .then((user) => res.send(user))
    .catch((err) =>
      res.status(400).send({
        message:
          "se pasaron datos inválidos a los métodos para crear un usuario/tarjeta o para actualizar el avatar/perfil de un usuario",
      })
    );
};

module.exports.updateUser = (req, res) => {
  const body = req.body;
  const update = { name: body.name, about: body.about };
  User.findOneAndUpdate({ _id: req.user._id }, update)
    .orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      const ERROR_CODE = 400;
      if (error.name === "SomeErrorName")
        return res.status(ERROR_CODE).send({
          message:
            "se pasaron datos inválidos a los métodos para crear un usuario/tarjeta o para actualizar el avatar/perfil de un usuario",
        });
    });
};

module.exports.updateAvatar = (req, res) => {
  const body = req.body;
  const update = { avatar: body.avatar };
  User.findOneAndUpdate({ _id: req.user._id }, update)
    .orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      const ERROR_CODE = 400;
      if (error.name === "SomeErrorName")
        return res.status(ERROR_CODE).send({
          message:
            "se pasaron datos inválidos a los métodos para crear un usuario/tarjeta o para actualizar el avatar/perfil de un usuario",
        });
    });
};

module.exports.login = (req, res) => {
  // const body = req.body;
  // const { email } = body.email;
  // const { password } = body.password;

  const { email, password } = req.body;
  console.log(password);
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === "production" ? JWT_SECRET : "dev-secret",
        {
          expiresIn: "7d",
        }
      );
      res.send({ token });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};

module.exports.meUser = (req, res) => {
  console.log(req.user, "solicitud del user");
  const userId = req.user._id;
  User.findOne({ _id: userId })
    .orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      const ERROR_CODE = 400;
      if (error.name === "SomeErrorName")
        return res.status(ERROR_CODE).send({
          message:
            "se pasaron datos inválidos a los métodos para crear un usuario/tarjeta o para actualizar el avatar/perfil de un usuario",
        });
    });
};
