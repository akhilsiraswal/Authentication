const config = require("config");
const mongoose = require("mongoose");
const userRoute = require("./routes/users.route");
const express = require("express");
const app = express();

if (!config.get("myprivatekey")) {
  console.log("FATAL ERROR: myprivatekey is not defined.");
  process.exit(1);
}

mongoose
  .connect("mongodb://localhost/nodejsauth", { useNewUrlParser: true })
  .then(() => console.log("connected to mongodb"))
  .catch((err) => console.log("could not connect to mongodb"));

app.use(express.json());

app.use("/api/users", userRoute);
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port :: ${port}`));
