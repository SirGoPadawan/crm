const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UserController");

router
  .get("/", (req, res) => UserController.actionIndex(req, res))
  .delete("/", (req, res) => UserController.actionDelete(req, res))
  .put("/", (req, res) => UserController.actionUpdate(req, res))
  .post("/", (req, res) => UserController.actionCreate(req, res));

module.exports = router;
