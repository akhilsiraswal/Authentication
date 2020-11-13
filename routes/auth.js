const { User } = require("../models/user");
const express = require("express");
const { signin, signup, signout } = require("../controllers/auth");
const { check, validationResult } = require("express-validator");
const router = express.Router();

router.post("/signup", signup);

router.post(
  "/signin",
  [
    check("email", "email is required").isEmail(),
    check("password", "password field is required").isLength({
      min: 3,
    }),
  ],
  signin
);

router.get("/signout", signout);

module.exports = router;
