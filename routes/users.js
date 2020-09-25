const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const config = require("../configServer.json");
const jwt = require("jsonwebtoken");

const pool = mysql.createPool(config.database);

const tokenKey = config.jwt.tokenKey;

router.get("/", function(req, res, next) {
  const token = req.headers.authentication;
  jwt.verify(token, tokenKey, function(err, decoded) {
    if (err) {
      res.status(401).json({ reason: "unauthorized" });
    }
    if (decoded) {
      pool.query(
        "SELECT firstName, lastName, patronymic, phone, email FROM users",
        function(err, data) {
          try {
            if (err) {
              throw new Error();
            }
            setUsers(data);
          } catch (e) {
            console.log(e);
          }
        }
      );
    }
  });
  function setUsers(data) {
    res.json(data);
  }
});

module.exports = router;
