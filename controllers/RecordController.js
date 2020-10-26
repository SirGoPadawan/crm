const { Record } = require("../models");
const BaseController = require("./BaseController");

class RecordController extends BaseController {
  static modelClass = Record;
  static fields = [
    "id",
    "client_id",
    "employee_id",
    "service_id",
    "date_recording",
    "duration",
  ];
}
module.exports = RecordController;
