const express = require("express");
const router = express.Router();
const { User } = require("../models");

function response(req, res) {
  User.findAll({
    attributes: [
      "id",
      "first_name",
      "last_name",
      "patronymic",
      "phone",
      "email",
      "path_img",
    ],
  })
    .then((data) => res.json(data))
    .catch((e) => console.log(e));
}

router.get("/", function(req, res, next) {
  response(req, res);
});

router.delete("/", function(req, res, next) {
  User.findOne({ where: { id: req.body.id } })
    .then((data) => data.destroy())
    .then(() => response(req, res))
    .catch((e) => console.log(e));
});

router.put("/", function(req, res, next) {
  User.update(
    {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      patronymic: req.body.patronymic,
      phone: req.body.phone,
      email: req.body.email,
    },
    { where: { id: req.body.id } }
  )
    .then(() => response(req, res))
    .catch((e) => console.log(e));
});

router.post("/", function(req, res, next) {
  User.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    patronymic: req.body.patronymic,
    phone: req.body.phone,
    email: req.body.email,
  })
    .then(() => response(req, res))
    .catch((e) => console.log(e));
});
module.exports = router;
