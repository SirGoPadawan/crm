const BaseModel = require("./BaseModel");

class City extends BaseModel {
  static fields(DataTypes) {
    return {
      ...super.fields(DataTypes),
      city: {
        type: DataTypes.STRING,
      },
    };
  }
}

module.exports = City;
