const Sequelize = require("sequelize");

class BaseModel extends Sequelize.Model{
  static fields(DataTypes){
    return {
      id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      }
    }
  }
  static init(sequelize, DataTypes) {
    return super.init(
      this.fields(DataTypes),
     {
      sequelize
    });
  }
}

module.exports = BaseModel

