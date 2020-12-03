const Sequelize = require("sequelize");
const sequelize = new Sequelize("sui", "root", "", {
  dialect: "mysql",
  host: "localhost",
});

const User = require("./User");
const Service = require("./Service");
const City = require("./City");
const Company = require("./Company");
const Branch = require("./Branch");
const Record = require("./Record");
const RecordService = require("./RecordService");

const models = {
  User: User.init(sequelize, Sequelize),
  Service: Service.init(sequelize, Sequelize),
  City: City.init(sequelize, Sequelize),
  Company: Company.init(sequelize, Sequelize),
  Branch: Branch.init(sequelize, Sequelize),
  Record: Record.init(sequelize, Sequelize),
  RecordService: RecordService.init(sequelize, Sequelize),
};

Record.belongsToMany(Service, { through: RecordService });
Service.belongsToMany(Record, { through: RecordService });

module.exports = models;
