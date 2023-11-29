const env = require("./env.js");

// const Sequelize = require("sequelize");
const { Sequelize, Model, DataTypes } = require("sequelize");

const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models
db.book = require("../model/book.model.js")(sequelize, Sequelize);
db.service = require("../model/service.model.js")(sequelize, Sequelize, DataTypes);
db.sale = require("../model/sale.model.js")(sequelize, Sequelize, DataTypes);

module.exports = db;
