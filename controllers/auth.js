const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.signup = (req, res) => {
  const email = req.body.email;
  const pass = req.body.password;
  User.findOne({ email }, (err, user) => {
    if (user) return res.json("Email already registered");
  });
  const user = new User(req.body);

  user.save((err, user) => {
    if (err) res.status(400).json("error saving data to database");

    return res.json(user);
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(404).json({ error: "email does not exist" });
    }

    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email or password do not match",
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);

    res.cookie("token", token, { expire: new Date() + 7 });

    res.json({ user });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "User signout Successfully",
  });
};
