const express = require("express");
const handleBars = require("express-handlebars");
const path = require("path");
const PORT = process.env.PORT || 8080;
const app = express();
const optionRoutes = require("./routes/options");
const recipeRoutes = require("./routes/recipes");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.engine("handlebars", handleBars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.get("/", (req, res) => {
  res.render("index");
});
app.use(optionRoutes);
app.use(recipeRoutes);

app.listen(PORT, () => {
  console.log("server listening on http://localhost:" + PORT) + "\n\n\n";
});
