const mongoose = require("mongoose");

const Dish = mongoose.model(
  "Dish",
  new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    vendor: 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
  })
);

module.exports = Dish;