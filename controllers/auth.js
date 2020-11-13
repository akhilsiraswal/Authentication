const User = require("../models/user");

exports.signup = (req, res) => {
  const user = new User(req.body);

  user.save((err, user) => {
    if (err) res.status(400).json("error saving data to database");

    res.json(user);
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) res.status(404).json("email or password is incorrect");

    if (user.password === password) res.send("login successful");
    else res.send("email or password incorrect");
  });
};
