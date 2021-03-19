let Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const sequelize = new Sequelize(config);

let Note = require("./note");
let Notebook = require("./notebook");
let User = require("./user");

const model = {};

model.Notebook = sequelize.import("./notebook");
model.Note = sequelize.import("./note");
model.User = sequelize.import("./user");

model.Notebook.hasMany(model.Note, {
  foreignKey: "notebookId",
  targetKey: "id"
});
model.User.hasMany(model.Notebook, { foreignKey: "userId", targetKey: "id" });
model.User.hasMany(model.Note, { foreignKey: "userId", targetKey: "id" });

sequelize.sync(/*{force: true}*/);

module.exports = { model, sequelize };
