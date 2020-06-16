// Sequelize (capital) references the standard library
const Sequelize = require("sequelize");
// sequelize (lowercase) references my connection to the DB.
const sequelize = require("../config/connection.js");

const SavedRecipe = sequelize.define("saved-recipes", {
  title: Sequelize.STRING,
  image: Sequelize.STRING,
  servings: Sequelize.STRING,
  readyInMinutes: Sequelize.STRING,
  sourceUrl: Sequelize.STRING,
  user: Sequelize.STRING,
});

SavedRecipe.sync({ force: true });

module.exports = SavedRecipe;
