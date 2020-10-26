const express = require("express");
const router = express.Router();
const CompanyController = require("../controllers/CompanyController");

router
  .get("/", (req, res) => CompanyController.actionIndex(req, res))
  .delete("/:id", (req, res) => CompanyController.actionDelete(req, res))
  .put("/:id", (req, res) => CompanyController.actionUpdate(req, res))
  .post("/", (req, res) => CompanyController.actionCreate(req, res));

module.exports = router;
