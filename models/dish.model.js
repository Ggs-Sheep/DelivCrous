const mongoose = require("mongoose");

const Dish = mongoose.model(
  "Dish",
  new mongoose.Schema({
    name: String,
    description: String,
    price: String,
    vendor: 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
  })
);

module.exports = Dish;