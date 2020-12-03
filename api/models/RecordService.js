const BaseModel = require("./BaseModel");

class RecordService extends BaseModel {
  static fields(DataTypes) {
    return {
      ...super.fields(DataTypes),
      RecordId: {
        type: DataTypes.INTEGER,
      },
      ServiceId: {
        type: DataTypes.INTEGER,
      },
    };
  }
}

module.exports = RecordService;
