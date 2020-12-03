const express = require("express");
const router = express.Router();
const BranchController = require("../controllers/BranchController");

router
  .get("/", (req, res) => BranchController.actionIndex(req, res))
  .delete("/:id", (req, res) => BranchController.actionDelete(req, res))
  .put("/:id", (req, res) => BranchController.actionUpdate(req, res))
  .post("/", (req, res) => BranchController.actionCreate(req, res));

module.exports = router;
