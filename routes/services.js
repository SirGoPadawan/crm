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
      pool.query("SELECT id, name FROM services", function(err, data) {
        try {
          if (err) {
            throw new Error();
          }
          setServices(data);
        } catch {
          console.log(e);
        }
      });
    }
  });
  function setServices(data) {
    res.json(data);
  }
});

module.exports = router;
