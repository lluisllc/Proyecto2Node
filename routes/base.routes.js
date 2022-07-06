const router = require("express").Router();
const isLoggedIn = require("../middleware/isLoggedIn");
const User = require("../models/User.model");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/profile", isLoggedIn, (req, res, next) => {
  User.findById(req.user._id)
    .populate("favorites")
    .then((user) => {
      res.render("profile", { user: req.session.user, userGames: user });
    });
});

router.get("/register", (req, res, next) => {
  res.render("register");
});

module.exports = router;
//para borrar
