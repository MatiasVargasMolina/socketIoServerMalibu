const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.producto = require("./producto")
db.category = require("./categoria")

db.ROLES = ["user", "admin", "moderator"];
db.CATEGORIAS = ["user", "admin", "moderator"];

module.exports = db;