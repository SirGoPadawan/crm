const express = require("express");
const router = express.Router();
const CityController = require("../controllers/CityController");

router
  .get("/", (req, res) => CityController.actionIndex(req, res))
  .delete("/:id", (req, res) => CityController.actionDelete(req, res))
  .put("/:id", (req, res) => CityController.actionUpdate(req, res))
  .post("/", (req, res) => CityController.actionCreate(req, res));

module.exports = router;
