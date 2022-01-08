const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");
const User = require("../models/user.model");
const Dish = require("../models/dish.model");
const Cart = require("../models/cart.model");
const authConfig = require("../config/auth.config");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    if (req.method == "OPTIONS") {
      res.header("Access-Control-Allow-Headers", "PUT", "POST", "PATCH", "DELETE", "GET");
      return res.status(200).json({});
    }
    next();
  });

  app.get("/cart/:client_id", [authJwt.verifyToken, authJwt.isClient], (req, res) => {
    User.findById({_id: req.params.client_id}, (err,user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      Cart.find({'client': { $in: user }}, (err, carts) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        res.send({carts:carts})
      });
    })
  })

  app.post("/cart/:client_id", [authJwt.verifyToken, authJwt.isClient], (req, res) => {
    User.findById({_id: req.params.client_id}, (err,user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      const cart = new Cart({
        client: user,
        date: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        dishes: [],
        state: "OnGoing",
        address: ""
      });
  
        cart.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
  
          res.send({ message: "Cart was added successfully!", cart: cart});
        });

      })
    });

  app.put("/cart/:client_id/:dish_id", [authJwt.verifyToken, authJwt.isClient], (req, res) => {
    User.findById({_id: req.params.client_id}, (err,user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      Dish.findById({ _id: req.params.dish_id }, (err, dish) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        Cart.findOneAndUpdate({client: user, state: "OnGoing"}, {$push: {dishes: dish}}, (err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({message: "Dish added"})
        })
      })
    })
   
  })  

  app.delete("/cart/:client_id/:dish_id", [authJwt.verifyToken, authJwt.isClient], (req,res) => {
    User.findById({_id: req.params.client_id}, (err,user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      Dish.findById({ _id: req.params.dish_id }, (err, dish) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        Cart.findOneAndUpdate({client: user, state: "OnGoing"}, {$pull: {dishes: dish._id}}, (err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({message: "Dish removed"})
        })
      })
    })
  })

  app.post("/cart/:client_id/validate", [authJwt.verifyToken, authJwt.isClient], (req,res) => {
    User.findById({_id: req.params.client_id}, (err,user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      Cart.findOneAndUpdate({client:user, state:"OnGoing"}, { $set: { state: 'Paid', address:req.body.address}}, (err) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        res.send({message:"Order completed"})
      })
    })
  })
}