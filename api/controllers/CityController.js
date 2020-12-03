const { City } = require("../models");
const BaseController = require("./BaseController");

class CityController extends BaseController {
  static modelClass = City;
  static fields = ["id", "city"];
}

module.exports = CityController;
