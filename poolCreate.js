const config = require("./configServer.json");
const mysql = require("mysql2");
const pool = mysql.createPool(config.database);

module.exports = pool;
