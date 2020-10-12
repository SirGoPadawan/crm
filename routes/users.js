const express = require("express");
const router = express.Router();
const pool = require("../poolCreate");
const dayjs = require("dayjs");

function response(req, res) {
  pool.query(
    "SELECT id, firstName, lastName, patronymic, phone, email FROM users",
    function(err, data) {
      try {
        if (err) {
          throw new Error();
        }
        res.status(200).json(data);
      } catch (e) {
        console.log(e);
      }
    }
  );
}

router.get("/", function(req, res, next) {
  response(req, res);
});
router.delete("/", function(req, res, next) {
  pool.query(`DELETE FROM users WHERE id="${req.body.id}"`, function(
    err,
    data
  ) {
    try {
      if (err) {
        throw new QueryException();
      }
      response(req, res);
    } catch (e) {
      res.status(e.status).json(e);
    }
  });
});
router.put("/", function(req, res, next) {
  pool.query(
    `UPDATE users SET firstName = "${
      req.body.firstName
    }", update_date= "${dayjs().format("YYYY-MM-DD HH:mm:ss")}", lastName = "${
      req.body.lastName
    }", patronymic = "${req.body.patronymic}", phone = "${
      req.body.phone
    }", email = "${req.body.email}"  WHERE id=${req.body.id}`,
    (err, data) => {
      try {
        if (err) {
          throw new Error();
        }
        response(req, res);
      } catch (e) {
        res.json(e);
      }
    }
  );
});

router.post("/", function(req, res, next) {
  pool.query(
    `INSERT INTO users (firstName, create_date, lastName, patronymic, phone, email) VALUES("${
      req.body.firstName
    }","${dayjs().format("YYYY-MM-DD HH:mm:ss")}","${req.body.lastName}","${
      req.body.patronymic
    }","${req.body.phone}","${req.body.email}")`,
    function(err, data) {
      try {
        if (err) {
          throw new QueryException();
        }
        response(req, res);
      } catch (e) {
        res.status(e.status).json(e);
      }
    }
  );
});
module.exports = router;
