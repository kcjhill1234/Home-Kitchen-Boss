var express = require("express");
var router = express.Router();
var model = require('../models/model')

// Create all our routes and set up logic within those routes where required.
router.post("/api", function(req, res) {
    // model.create(["spoon"],
    let {search,cuisine,diet,alergy} = req.body
    console.log("control allergy=",alergy) 
    model.FindRecipe(search,cuisine,diet,alergy,function (res){
        console.log("returned fromapi", res.data)
      });
    });
  // });

router.get("/", (req, res) => {
    res.render("index");
  });
    

// Export routes for server.js to use.
module.exports = router;
