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
    total: String,
    dishes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Dish"
      }
    ]
  })
);

module.exports = Cart;