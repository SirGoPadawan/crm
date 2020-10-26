const { Company } = require("../models");
const BaseController = require("./BaseController");

class CompanyController extends BaseController {
  static modelClass = Company;
  static fields = ["id", "leader_id", "fullname", "shortname"];
}
module.exports = CompanyController;
