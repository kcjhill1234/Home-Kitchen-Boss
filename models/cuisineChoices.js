// Sequelize (capital) references the standard library
const Sequelize = require("sequelize");
// sequelize (lowercase) references my connection to the DB.
const sequelize = require("../config/connection.js");
const cuisineChoices = require('./data/cuisine.json');

const CuisineChoice = sequelize.define("cuisine-choice", {
    name: Sequelize.STRING,
    value: Sequelize.STRING,
}, { timestamps: false });

CuisineChoice.sync({ force: true }).then(() => {
    return Promise.all(cuisineChoices.map(choice => CuisineChoice.create(choice)))
});

module.exports = CuisineChoice;