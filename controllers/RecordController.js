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
  static async actionCreate(request, response) {
    const records = await this.modelClass.create(request.body);
    const services = await Service.findAll({
      where: {
        id: {
          [Op.or]: request.body.services_id,
        },
      },
    });
    await records.addService(services);
    const record = await this.modelClass.findOne({ where: { id: records.id } });
    const preServiceList = await record.getServices();
    const serviceList = {
      strServices: "",
      idArrServices: [],
    };
    for (let i = 0; i < preServiceList.length; i++) {
      serviceList.strServices += preServiceList[i].service + ", ";
      serviceList.idArrServices.push(preServiceList[i].id);
    }
    response.json({ ...records.dataValues, ...serviceList });
  }
}
module.exports = RecordController;
