document.addEventListener("DOMContentLoaded", () => {
    const dietChoiceSelect = document.querySelector("#dietChoices");
    const cuisineChoicesSelect = document.querySelector("#cuisineChoices");
    const foodAllergiesSelect = document.querySelector("#foodAllergies");
    const dietChoices = [
        "",
        "Gluten Free",
        "Ketogenic",
        "Vegetarian",
        "Lacto-Vegetarian",
        "Ovo-Vegetarian",
        "Vegan",
        "Pescetarian",
        "Paleo",
        "Primal",
        "Whole30",
    ].map(option => `<option>${option}</option>`).join("");
    dietChoiceSelect.innerHTML = dietChoices
    const selectConfig = {
        classes: "select"
        
    }
    const dietChoiceInstance = M.FormSelect.init(dietChoiceSelect, selectConfig)
    const cuisineChoiceInstance = M.FormSelect.init(cuisineChoicesSelect, selectConfig)
    const foodChoiceInstance = M.FormSelect.init(foodAllergiesSelect, selectConfig)
})