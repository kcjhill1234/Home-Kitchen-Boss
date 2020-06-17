document.addEventListener("DOMContentLoaded", async () => {
  const username = localStorage.getItem("username") || "DEMO";

  const getOptionsUrl = (url) => `/options/${url}`;
  const getApiUrl = (url) => `/api/${url}`;

  const getSpoonApiUrl = ({ search, cuisine, diet, intolerances }) => {
    return `https://api.spoonacular.com/recipes/search?apiKey=e85211eb9a3c49349f9007cc03edf1c7&query=${search}&number=20&cuisine=${cuisine}&diet=${diet}&intolerances=${intolerances}`;
  };
  const mapToOption = ({ name, value }) => {
    return `<option value="${value}">${name}</option>`;
  };

  const mapRecipeToCard = (data, showBtn) => {
    const { title, image, readyInMinutes, servings, sourceUrl } = data;
    const recipe = btoa(JSON.stringify(data));
    const favoriteBtn = `<button data-recipe='${recipe}' class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">favorite</i></button>`;
    return `
    <div class="col l3 m6 s12">
    <div class="card">
      <div class="card-image">
        <img src="${image}">
        <span class="card-title">${title}</span>
        ${showBtn ? favoriteBtn : ""}
      </div>
      <div class="card-content">
        <span>Ready in ${readyInMinutes} minutes</span>
        <span>Serves ${servings} ${servings <= 1 ? "Person" : "People"}</span>
        <div class="card-action">
        <a href="${sourceUrl}" target="_blank">Go To Recipe</a>
        </div>
      </div>
    </div>
    </div>
    `;
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
  const searchInput = document.querySelector("#searchTxt");
  const resultsContainer = document.querySelector("#results");
  const modal = document.querySelector("#userModal");
  const usernameInput = document.querySelector("#username");

  const cuisineChoices = cuisineJson.map(mapToOption).join("");
  const dietChoices = dietJson.map(mapToOption).join("");
  const intoleranceChoices = intoleranceJson.map(mapToOption).join("");

  cuisineChoicesSelect.innerHTML += cuisineChoices;
  dietChoiceSelect.innerHTML += dietChoices;
  foodAllergiesSelect.innerHTML += intoleranceChoices;

  const selectConfig = { classes: "select" };
  const modalConfig = {
    onOpenStart: () => {
      if (username) {
        usernameInput.value = username;
      }
    },
    onCloseStart: () => {
      localStorage.setItem("username", usernameInput.value);
    },
  };
  M.Modal.init(modal, modalConfig).open();
  M.FormSelect.init(dietChoiceSelect, selectConfig);
  M.FormSelect.init(cuisineChoicesSelect, selectConfig);
  const foodChoiceInstance = M.FormSelect.init(
    foodAllergiesSelect,
    selectConfig
  );
  document.querySelector("#saveRecipe").addEventListener("click", async () => {
    const savedRecipes = await (
      await fetch(getApiUrl(`recipe/${username}`))
    ).json();
    const html = savedRecipes
      .map((recipe) => {
        return mapRecipeToCard(recipe, false);
      })
      .join("");
    resultsContainer.innerHTML = html;
  });

  document.querySelector("#searchBtn").addEventListener("click", async () => {
    const diet = dietChoiceSelect.value;
    const cuisine = cuisineChoicesSelect.value;
    const intolerances = foodChoiceInstance.getSelectedValues().join();
    const search = searchInput.value;

    const data = {
      diet,
      cuisine,
      intolerances,
      search,
    };

    console.log(data);
    console.log(getSpoonApiUrl(data));
    const spoonData = await (await fetch(getSpoonApiUrl(data))).json();
    console.log(spoonData);
    if (spoonData.results.length > 0) {
      const html = spoonData.results
        .map((spoon) => {
          spoon.image = spoonData.baseUri + spoon.image;
          return spoon;
        })
        .map((recipe) => {
          return mapRecipeToCard(recipe, true);
        })
        .join("");
      resultsContainer.innerHTML = html;
      for (const element of document.querySelectorAll(".btn-floating")) {
        element.addEventListener("click", async function (event) {
          event.stopPropagation();
          const recipeData = atob(this.dataset.recipe);
          delete recipeData.id;

          await fetch(getApiUrl(`recipe/${username}`), {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: recipeData,
          }).catch(console.error);
        });
      }
    } else {
      resultsContainer.innerHTML = "There were no results";
    }
  });

  console.log(await (await fetch(getApiUrl(`recipe/${username}`))).json());
});
