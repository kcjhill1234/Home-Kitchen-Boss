// Sequelize (capital) references the standard library
const Sequelize = require("sequelize");
// sequelize (lowercase) references my connection to the DB.
const sequelize = require("../config/connection.js");
const intoleranceChoices = require("./data/intolerance.json");

const IntoleranceChoice = sequelize.define("intolerance-choice", {
    name: Sequelize.STRING,
    value: Sequelize.STRING,
}, { timestamps: false });

IntoleranceChoice.sync({ force: true }).then(() => {
    return Promise.all(intoleranceChoices.map(choice => IntoleranceChoice.create(choice)))
});

module.exports = IntoleranceChoice;