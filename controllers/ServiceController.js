const { Service } = require("../models");
const BaseController = require("./BaseController");

class ServiceController extends BaseController {
  static modelClass = Service;
  static fields = ["id", "service"];
}
module.exports = ServiceController;
