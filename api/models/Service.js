const BaseModel = require("./BaseModel");

class Service extends BaseModel {
  static fields(DataTypes) {
    return {
      ...super.fields(DataTypes),
      service: {
        type: DataTypes.STRING,
      },
    };
  }
}

module.exports = Service;
