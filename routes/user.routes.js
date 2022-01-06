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
    if (req.method == "OPTIONS") {
      res.header("Access-Control-Allow-Headers", "PUT", "POST", "PATCH", "DELETE", "GET");
      return res.status(200).json({});
    }
    next();
  });

  // ---------Tests---------
  app.get("/api/test/all", controller.allAccess);

  app.get(
    "/api/test/client",
    [authJwt.verifyToken, authJwt.isClient],
    controller.clientBoard);

  app.get(
    "/api/test/vendor",
    [authJwt.verifyToken, authJwt.isVendor],
    controller.vendorBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  // ---------End Tests---------

};