const express = require("express");
const router = express.Router();
const pool = require("../poolCreate");

const QueryException = require("../exception/QueryException");

function response(req, res) {
  pool.query("SELECT service, id FROM services", function(err, data) {
    try {
      if (err) {
        throw new QueryException();
      }
      res.status(200).json(data);
    } catch (e) {
      console.log(e);
    }
  });
}

router.get("/", function(req, res, next) {
  response(req, res);
});

router.delete("/", function(req, res, next) {
  console.log(req.body);
  pool.query(`DELETE FROM services WHERE id="${req.body.id}"`, function(
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
    `UPDATE services SET service = "${req.body.service}" WHERE id=${req.body.id}`,
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
    `INSERT INTO services (service) VALUES("${req.body.service}")`,
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
