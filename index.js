const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const express = require("express");
const app = express();


app.use(express.json([]));
app.use(express.urlencoded({ extended: false }));
app.use("/api", authRoute);
app.use(express.static("views"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/Animatedsignin.html");
});


mongoose
  .connect("mongodb://localhost/nodejsauth", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to mongodb"))
  .catch((err) => console.log("could not connect to mongodb"));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port :: ${port}`));
