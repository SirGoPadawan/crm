const express = require("express");
const router = express.Router();
const pool = require("../poolCreate");

router.get("/", function(req, res, next) {
  pool.query("SELECT id, city FROM cities", function(err, data) {
    try {
      if (err) {
        throw new Error();
      }
      res.json(data);
    } catch (e) {
      console.log(e);
    }
  });
});

module.exports = router;
