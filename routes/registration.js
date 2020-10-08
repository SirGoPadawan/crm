const QueryException = require("../exception/QueryException");
const UserExistsException = require("../exception/UserExistsException");

const express = require("express");
const router = express.Router();
const pool = require("../poolCreate");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);
const dayjs = require("dayjs");

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
        const create_date = dayjs().format("YYYY-MM-DD HH:mm:ss");
        pool.query(
          "INSERT INTO users (phone, pass, firstName, lastName, patronymic, email, create_date) VALUES (?,?,?,?,?,?)",
          [phone, pass, firstName, lastName, patronymic, email, create_date],
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
