const express = require("express");
const handleBars = require("express-handlebars");
const path = require("path");
const PORT = process.env.PORT || 8080;
const app = express();
const optionRoutes = require("./routes/options");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.engine("handlebars", handleBars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.get("/", (req, res) => {
  res.render("index");
});
optionRoutes(app);

app.listen(PORT, () => {
  console.log("server listening on http://localhost:" + PORT);
});
