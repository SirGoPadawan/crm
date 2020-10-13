const express = require("express");
const router = express.Router();
const { Service } = require("../models");

const QueryException = require("../exception/QueryException");

function response(req, res) {
  Service.findAll()
    .then((data) => res.json(data))
    .catch((e) => console.log(e));
}

router.get("/", function(req, res, next) {
  response(req, res);
});

router.delete("/", function(req, res, next) {
  Service.findOne({ where: { id: req.body.id } })
    .then((data) => data.destroy())
    .then(() => response(req, res))
    .catch((e) => console.log(e));
});
router.put("/", function(req, res, next) {
  Service.update(
    {
      service: req.body.service,
    },
    { where: { id: req.body.id } }
  )
    .then(() => response(req, res))
    .catch((e) => console.log(e));
});

router.post("/", function(req, res, next) {
  Service.create({
    service: req.body.service,
  })
    .then(() => response(req, res))
    .catch((e) => console.log(e));
});

module.exports = router;
