document.addEventListener("DOMContentLoaded", async () => {
  const getOptionsUrl = (url) => `http://localhost:8080/options/${url}`;
  const mapToOption = ({ name, value }) => {
    return `<option value="${value}">${name}</option>`;
  };

  const dietJson = await (await fetch(getOptionsUrl("diet-choice"))).json();
  const cuisineJson = await (
    await fetch(getOptionsUrl("cuisine-choice"))
  ).json();
  const intoleranceJson = await (
    await fetch(getOptionsUrl("intolerance-choice"))
  ).json();

  const dietChoiceSelect = document.querySelector("#dietChoices");
  const cuisineChoicesSelect = document.querySelector("#cuisineChoices");
  const foodAllergiesSelect = document.querySelector("#foodAllergies");

  const cuisineChoices = cuisineJson.map(mapToOption).join("");
  const dietChoices = dietJson.map(mapToOption).join("");
  const intoleranceChoices = intoleranceJson.map(mapToOption).join("");

  cuisineChoicesSelect.innerHTML += cuisineChoices;
  dietChoiceSelect.innerHTML += dietChoices;
  foodAllergiesSelect.innerHTML += intoleranceChoices;

  const selectConfig = { classes: "select" };

  // const dietChoiceInstance
  M.FormSelect.init(dietChoiceSelect, selectConfig);
  // const cuisineChoiceInstance
  M.FormSelect.init(cuisineChoicesSelect, selectConfig);
  // const foodChoiceInstance
  M.FormSelect.init(foodAllergiesSelect, selectConfig);
});
