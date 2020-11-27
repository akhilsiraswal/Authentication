const config = require("config");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(express.json([]));

app.use("/api", authRoute);

app.use(express.static("views"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/Animatedsignin.html");
});

if (!config.get("myprivatekey")) {
  console.log("FATAL ERROR: myprivatekey is not defined.");
  process.exit(1);
}

mongoose
  .connect("mongodb://localhost/nodejsauth", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to mongodb"))
  .catch((err) => console.log("could not connect to mongodb"));

// app.use("/api", signup);
// app.use("/api", signin);
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port :: ${port}`));
