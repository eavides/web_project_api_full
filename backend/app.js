const express = require("express");
const router = require("./routes/users.js");
require("dotenv").config();
const controllers = require("./controllers/users.js");
const routerCard = require("./routes/cards.js");
const { PORT = 3000 } = process.env;
const app = express();
const mongoose = require("mongoose");
const { login, createUser } = controllers;
const auth = require("./middlewares/auth");
const { errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const cors = require("cors");

mongoose
  .connect("mongodb://127.0.0.1:27017/aroundb")
  .then(() => {
    console.log("conexion exitosa");
  })
  .catch((error) => {
    console.log(error);
  });

app.use(cors());
app.options("*", cors());

app.use(express.json());

app.use(requestLogger);
app.use("/cards", auth, routerCard);
app.post("/signin", login);
app.post("/signup", createUser);
app.use("/users", auth, router);

app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(err.statusCode).send({
    message:
      err.statusCode === 500
        ? "Se ha producido un error en el servidor"
        : err.message,
  });
});
app.use((req, res) => {
  res.status(404).send({ message: "Recurso solicitado no encontrado" });
});
app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
