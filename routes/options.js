const DietChoice = require("../models/dietChoices");
const CuisineChoice = require("../models/cuisineChoices");
const IntoleranceChoice = require("../models/intoleranceChoices");

module.exports = (app) => {
  const baseUrl = "/options";

  app.get(`${baseUrl}/diet-choice`, async (req, res) => {
    res.json(await DietChoice.findAll());
  });

  app.get(`${baseUrl}/cuisine-choice`, async (req, res) => {
    res.json(await CuisineChoice.findAll());
  });

  app.get(`${baseUrl}/intolerance-choice`, async (req, res) => {
    res.json(await IntoleranceChoice.findAll());
  });
};
