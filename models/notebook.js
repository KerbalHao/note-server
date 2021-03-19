let { randomId } = require("../helpers/util");
module.exports = (sequelize, DataTypes, Foreign) => {
  const Notebook = sequelize.define("Notebook", {
    title: {
      type: DataTypes.STRING,
      defaultValue: ""
    },
    userId: DataTypes.INTEGER
  });
  return Notebook;
};
