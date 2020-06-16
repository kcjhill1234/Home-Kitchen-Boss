const express = require("express");
const savedRecipe = require("../models/savedRecipe");
const router = express.Router();
const baseUrl = "/api";

router.get(`${baseUrl}/recipe/:user`, async (req, res) => {
  const user = req.params.user;
  res.json(
    await savedRecipe.findAll({
      where: {
        user,
      },
    })
  );
});

router.post(`${baseUrl}/recipe/:user`, async (req, res) => {
  const user = req.params.user;
  const { title, servings, readyInMinutes, image, sourceUrl } = req.body;
  const newRecipe = await savedRecipe.create({
    title,
    servings,
    readyInMinutes,
    image,
    sourceUrl,
    user,
  });
  res.json(newRecipe);
});

module.exports = router;
