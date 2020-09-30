const config = require("./configServer.json");
const mysql = require("mysql");
const pool = mysql.createPool(config.database);

module.exports = pool;
