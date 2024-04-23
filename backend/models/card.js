const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return /^(http|https):\/\/(?:www\.)?[^\s@]+\.[^\s@]+(?:\/[a-zA-Z0-9._~:/?%#[\]@!$&'()*+,;=]*)?(?:#[a-zA-Z0-9._~:/?%#[\]@!$&'()*+,;=]*)?$/.test(
          value
        );
      },
      message: "No se a ingresado un link valido",
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  likes: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Card", cardSchema);
