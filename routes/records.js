const express = require("express");
const router = express.Router();
const RecordController = require("../controllers/RecordController");

router
  .get("/", (req, res) => RecordController.actionIndex(req, res))
  .delete("/:id", (req, res) => RecordController.actionDelete(req, res))
  .put("/:id", (req, res) => RecordController.actionUpdate(req, res))
  .post("/", (req, res) => RecordController.actionCreate(req, res));

module.exports = router;
