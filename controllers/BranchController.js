const { Branch } = require("../models");
const BaseController = require("./BaseController");

class BranchController extends BaseController {
  static modelClass = Branch;
  static fields = ["id", "branch_name", "company_id"];
}

module.exports = BranchController;
