// Sequelize (capital) references the standard library
const Sequelize = require("sequelize");
// sequelize (lowercase) references my connection to the DB.
const sequelize = require("../config/connection.js");

const DietChoice = sequelize.define("diet-choice", {
    name: Sequelize.STRING,
    value: Sequelize.STRING,
}, { timestamps: false });

const dietChoices = [
    { name: "Gluten Free", value: "glutenfree" },
    { name: "Ketogenic", value: "ketogentic" },
    { name: "Vegetarian", value: "vegetarian" },
    { name: "Lacto-Vegetarian", value: "lactovegetarian" },
    { name: "Ovo-Vegetarian", value: "ovovegetarian" },
    { name: "Vegan", value: "vegan" },
    { name: "Pescetarian", value: "pescetarian" },
    { name: "Paleo", value: "paleo" },
    { name: "Primal", value: "primal" },
    { name: "Whole30", value: "whole30" },
]
// Syncs with DB
DietChoice.sync({ force: true }).then(() => {
    return Promise.all(dietChoices.map(choice => DietChoice.create(choice)))
});

module.exports = DietChoice;