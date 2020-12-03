const { Record, Service, RecordService } = require("../models");
const BaseController = require("./BaseController");
const { Op } = require("sequelize");

class RecordController extends BaseController {
  static modelClass = Record;
  static fields = [
    "id",
    "client_id",
    "employee_id",
    "date_recording",
    "duration",
    "start_record",
    "end_record",
  ];
  static async actionIndex(request, response) {
    try {
      const data = await this.modelClass.findAll({ include: Service });
      response.status(200).json(data);
    } catch (error) {
      response.status(400).json(error);
    }
  }
  static async actionCreate(request, response) {
    try {
      const records = await this.modelClass.create(request.body);
      const services = await Service.findAll({
        where: {
          id: {
            [Op.or]: request.body.services_id,
          },
        },
      });
      await records.addService(services);

      const record = await this.modelClass.findOne({
        where: { id: records.id },
        include: Service,
      });
      response.status(200).json(record);
    } catch (error) {
      response.status(400).json(error);
    }
  }
}
module.exports = RecordController;
