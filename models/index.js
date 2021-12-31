const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.dish = require("./dish.model");
db.cart = require("./cart.model");

db.ROLES = ["client", "admin", "vendor"];

module.exports = db;