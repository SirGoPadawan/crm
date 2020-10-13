const express = require("express");
const router = express.Router();
const { City } = require("../models");

router.get("/", function(req, res, next) {
  City.findAll()
    .then((data) => res.json(data))
    .catch((e) => console.log(e));
});

module.exports = router;
