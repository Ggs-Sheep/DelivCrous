const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");
const User = require("../models/user.model");
const Dish = require("../models/dish.model")

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

    // Create a dish
    app.post("/dish", [authJwt.verifyToken, authJwt.isVendor], (req, res) => {
        const dish = new Dish({
          name: req.body.name,
          description: req.body.description,
          price: req.body.price,
        });
    
        // Find User id from given vendor name, assumed as vendor since this request is only for vendors
        User.findOne({ username: req.body.vendor }, (err, vendor) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
    
          dish.vendor = [vendor._id];
          dish.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
    
            res.send({ message: "Dish was added successfully!"});
          });
        });
      })
    
      // Get all dishes
      app.get("/dish", [authJwt.verifyToken, authJwt.isClient], (req, res) => {
        Dish.find()
        .then((res_dish) => res.json(res_dish))
        .catch(() => res.status(404).end())
      })
    
      // Get by Name
      app.get("/dish/:name",[authJwt.verifyToken, authJwt.isClient], (req, res) => {
        Dish.findOne({ name: req.params.name }, (err, dish) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
    
          res.send(dish)
        })
      })
    
}