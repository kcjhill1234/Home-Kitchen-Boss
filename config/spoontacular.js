axios= require("axios")
module.exports = function displayRecipes(search,cuisine,diet,alergy,cb) {
console.log("api alergy=",alergy)
    //  query for spoonacular
    var queryUrl = `https://api.spoonacular.com/recipes/search?apiKey=e85211eb9a3c49349f9007cc03edf1c7&query=${search}&number=20&cuisine=${cuisine}&diet=${diet}&intolerances=;`;
    console.log("query",queryUrl)
    //  Creating an AJAX call for the specific search button being clicked.
    axios.get(queryUrl).then(function (response) {
     
        cb(response);})}
