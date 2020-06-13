const express = require("express");
const handleBars = require("express-handlebars");
const path = require("path");
const PORT = 8080;
const app = express();
const routes= require('./control/controller')
var bodyParser= require("body-parser")
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.engine("handlebars", handleBars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(routes);



app.listen(PORT, () => {
  console.log("server listening on http://localhost:" + PORT);
});

