const BaseModel = require("./BaseModel");

class Branch extends BaseModel {
  static fields(DataTypes) {
    return {
      ...super.fields(DataTypes),
      branch_name: {
        type: DataTypes.STRING,
      },
      company_id: {
        type: DataTypes.INTEGER,
      },
    };
  }
}

module.exports = Branch;
