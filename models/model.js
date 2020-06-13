const spoon = require ("../config/spoontacular")
var model = {
   // create a new burger in database
    FindRecipe: function(search,cuisine,diet,alergy, cb) {
      spoon(search,cuisine,diet,alergy,cb)
    }
    }
    
  
  // Export the database functions to use in  controller
  module.exports = model;