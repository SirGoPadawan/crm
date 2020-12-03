const dayjs = require("dayjs");
const BaseModel = require("./BaseModel");

class User extends BaseModel {
  static fields(DataTypes) {
    return {
      ...super.fields(DataTypes),
      first_name: {
        type: DataTypes.STRING,
      },
      last_name: {
        type: DataTypes.STRING,
      },
      patronymic: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
        unique: true,
      },
      path_img: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
        unique: true,
      },
      token: {
        type: DataTypes.STRING,
        unique: true,
      },
      refresh_token: {
        type: DataTypes.STRING,
        unique: true,
      },
      birthday: {
        type: DataTypes.DATE,
        set(value) {
          this.setDataValue("birthday", dayjs(value).format("YYYY-MM-DD"));
        },
      },
    };
  }
}

module.exports = User;
