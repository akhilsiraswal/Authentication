const config = require("config");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
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

app.use("/api", authRoute);
// app.use("/api", signup);
// app.use("/api", signin);
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port :: ${port}`));
