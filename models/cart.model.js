const mongoose = require("mongoose");

const Cart = mongoose.model(
  "Cart",
  new mongoose.Schema({
    client: 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
    date: String,
    dishes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Dish"
      }
    ],
    state: String,
    address: String
  })
);

module.exports = Cart;