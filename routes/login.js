const QueryException = require("../exception/QueryException");
const LoginException = require("../exception/LoginException");

const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../configServer.json");

const pool = mysql.createPool(config.database);

const tokenKey = config.jwt.tokenKey;

router.post("/", function(req, res, next) {
  pool.query(`SELECT * FROM users WHERE phone = '${req.body.phone}'`, function(
    err,
    data
  ) {
    try {
      if (err) {
        throw new QueryException();
      }
      if (bcrypt.compareSync(req.body.password, data[0].pass)) {
        res.status(200).json({
          token: jwt.sign({ phone: data[0].phone }, tokenKey, {
            algorithm: "HS256",
            expiresIn: "1h",
          }),
        });
      } else {
        throw new LoginException();
      }
    } catch (e) {
      res.status(e.status).json(e);
    }
  });
});

module.exports = router;
