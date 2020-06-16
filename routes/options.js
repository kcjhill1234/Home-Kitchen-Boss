const DietChoice = require("../models/dietChoices");
const CuisineChoice = require("../models/cuisineChoices");
const IntoleranceChoice = require("../models/intoleranceChoices");
const express = require("express");
const router = express.Router();
const baseUrl = "/options";

router.get(`${baseUrl}/diet-choice`, async (req, res) => {
  res.json(await DietChoice.findAll());
});

router.get(`${baseUrl}/cuisine-choice`, async (req, res) => {
  res.json(await CuisineChoice.findAll());
});

router.get(`${baseUrl}/intolerance-choice`, async (req, res) => {
  res.json(await IntoleranceChoice.findAll());
});

module.exports = router;
