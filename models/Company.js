const BaseModel = require("./BaseModel");

class Company extends BaseModel {
  static fields(DataTypes) {
    return {
      ...super.fields(DataTypes),
      fullname: {
        type: DataTypes.STRING,
      },
      shortname: {
        type: DataTypes.STRING,
      },
      leader_id: {
        type: DataTypes.INTEGER,
      },
    };
  }
}

module.exports = Company;
