const Sequelize = require("sequelize");
const sequelize = new Sequelize("sui", "root", "", {
  dialect: "mysql",
  host: "localhost",
});

const User = require("./User");
const Service = require("./Service");
const City = require("./City");

const models = {
  User: User.init(sequelize, Sequelize),
  Service: Service.init(sequelize, Sequelize),
  City: City.init(sequelize, Sequelize),
};

module.exports = models;
