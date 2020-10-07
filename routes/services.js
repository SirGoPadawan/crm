const express = require("express");
const router = express.Router();
const pool = require("../poolCreate");

const QueryException = require("../exception/QueryException");

router.get("/", function(req, res, next) {
  console.log(req);
  pool.query("SELECT id, name FROM services", function(err, data) {
    try {
      if (err) {
        throw new Error();
      }
      res.status(200).json(data);
    } catch (e) {
      console.log(e);
    }
  });
});

router.delete("/", function(req, res, next) {
  pool.query(`DELETE FROM services WHERE id="${req.body.id}"`, function(
    err,
    data
  ) {
    try {
      if (err) {
        throw new QueryException();
      }
      pool.query("SELECT id, name FROM services", function(err, data) {
        if (err) {
          throw new QueryException();
        }
        res.status(200).json(data);
      });
    } catch (e) {
      res.status(e.status).json(e);
    }
  });
});
router.put("/", function(req, res, next) {
  pool.query(
    `UPDATE services SET name = "${req.body.name} " WHERE id=${req.body.id}`,
    (err, data) => {
      try {
        if (err) {
          throw new Error();
        }
        pool.query("SELECT id, name FROM services", function(err, data) {
          if (err) {
            throw new QueryException();
          }
          res.status(200).json(data);
        });
      } catch (e) {
        res.json(e);
      }
    }
  );
});

router.post("/", function(req, res, next) {
  pool.query(`INSERT INTO services (name) VALUES("${req.body.name}")`, function(
    err,
    data
  ) {
    try {
      if (err) {
        throw new QueryException();
      }
      pool.query("SELECT id, name FROM services", function(err, data) {
        if (err) {
          throw new QueryException();
        }
        res.status(200).json(data);
      });
    } catch (e) {
      res.status(e.status).json(e);
    }
  });
});

module.exports = router;
