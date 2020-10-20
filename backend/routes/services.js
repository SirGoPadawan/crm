const express = require("express");
const router = express.Router();
const ServiceController = require("../controllers/ServiceController");

router
  .get("/", (req, res) => ServiceController.actionIndex(req, res))
  .delete("/", (req, res) => ServiceController.actionDelete(req, res))
  .put("/", (req, res) => ServiceController.actionUpdate(req, res))
  .post("/", (req, res) => ServiceController.actionCreate(req, res));

module.exports = router;
