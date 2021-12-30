// Requierements
const express = require('express')
const path = require('path')
const mongoose = require("mongoose")
const mongooseSerial = require("mongoose-serial")
const bodyParser = require("body-parser")
const app = express() 

// Starting Express App
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/DeliveCrous")

const Dish = new mongoose.Schema({ _id: String,name: String, description: String, price: Number, allergens: String});
Dish.plugin(mongooseSerial, { field:"_id"});
const Cart = new mongoose.Schema({ _id: String,user: User, total_amount: Number, dishes: [Dish], state: String});
Cart.plugin(mongooseSerial, { field:"_id"});

const dishes = new mongoose.model('Dish',Dish)
const carts = new mongoose.model("Cart",Cart)

// ---------Dish---------

// Create a Dish
app.post("/dish", (req, res) => {
const dishToSave = new dishes(req.body)
dishToSave.save().then((dish) => res.json(dish))
})

// Get all Dishes
app.get("/dish", async (req, res) => {
dishes.find()
    .then((res_dish) => res.json(res_dish))
    .catch(() => res.status(404).end())
})

// Read one by ID
app.get("/dish/:id", async (req, res) => {
    dishes.findById(req.params.id)
      .then((dish) => res.json(dish))
      .catch(() => res.status(404).end())
  })


app.listen(3000)