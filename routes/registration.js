const QueryException = require("../exception/QueryException");
const UserExistsException = require("../exception/UserExistsException");

const express = require("express");
const router = express.Router();
const mysql = require("mysql");

const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);

const config = require("../configServer.json");

const pool = mysql.createPool(config.database);

router.post("/", function(req, res, next) {
  pool.query(`SELECT * FROM users WHERE phone = '${req.body.phone}'`, function(
    err,
    data
  ) {
    try {
      if (err) {
        throw new QueryException();
      }
      if (data.length === 0) {
        const firstName = req.body.firstname;
        const lastName = req.body.lastname;
        const pass = bcrypt.hashSync(req.body.password, salt);
        const phone = req.body.phone;
        const email = req.body.email;
        const patronymic = req.body.patronymic;
        pool.query(
          "INSERT INTO users (phone, pass, firstName, lastName, patronymic, email) VALUES (?,?,?,?,?,?)",
          [phone, pass, firstName, lastName, patronymic, email],
          function(err, data) {
            if (err) {
              throw new QueryException();
            }
            const respons = "Пользователь добавлен";
            setRes(respons, 201);
          }
        );
      } else {
        throw new UserExistsException();
      }
    } catch (e) {
      res.status(e.status).json(e);
    }
  });
  function setRes(value, status) {
    res.status(status).json(value);
  }
});

module.exports = router;
