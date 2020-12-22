const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(express.json([]));
app.use(express.urlencoded({ extended: true }));
app.use("/api", authRoute);
app.use(express.static("views"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/Animatedsignin.html");
});

mongoose
  .connect("mongodb://localhost:27017/nodejsauth", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to mongodb"))
  .catch((err) => console.log("could not connect to mongodb"));

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Listening on port :: ${port}`));
