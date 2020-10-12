const express = require("express");
const router = express.Router();
const pool = require("../poolCreate");

function response(req, res) {
  pool.query(
    "SELECT id, first_name, last_name, patronymic, email, phone, path_img FROM users",
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
    `UPDATE users SET first_name = "${
      req.body.first_name
    }",  last_name = "${
      req.body.last_name
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
    `INSERT INTO users (first_name, last_name, patronymic, phone, email) VALUES("${
      req.body.first_name
    }","${req.body.last_name}","${
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
