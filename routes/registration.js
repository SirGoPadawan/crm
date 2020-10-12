const QueryException = require("../exception/QueryException");
const UserExistsException = require("../exception/UserExistsException");

const express = require("express");
const router = express.Router();
const pool = require("../poolCreate");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);

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
        const first_name = req.body.first_name;
        const last_name = req.body.last_name;
        const password = bcrypt.hashSync(req.body.password, salt);
        const phone = req.body.phone;
        const email = req.body.email;
        const patronymic = req.body.patronymic;
        pool.query(
          "INSERT INTO users (phone, password, first_name, last_name, patronymic, email) VALUES (?,?,?,?,?,?)",
          [phone, password, first_name, last_name, patronymic, email],
          function(err, data) {
            if (err) {
              throw new QueryException();
            }
            res.status(201).json({ isCreate: "yes" });
          }
        );
      } else {
        throw new UserExistsException();
      }
    } catch (e) {
      res.status(e.status).json(e);
    }
  });
});

module.exports = router;
